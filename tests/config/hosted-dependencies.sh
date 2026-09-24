#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
sglang_digest='sha256:984699c298a95b73c469b2191403ddc85fd780506e13c39c4afff3845e27bc6c'

fail() {
  printf 'hosted dependency verification failed: %s\n' "$*" >&2
  return 1
}

value() {
  sed -n -E "s/^[[:space:]]*$2[[:space:]]*:[[:space:]]*['\"]?([^'\"#[:space:]]+)['\"]?.*$/\\1/p" "$1"
}

validate_profiles() {
  local root="$1" file public worker revision image expected
  local -a files=() public_ids=() worker_ids=()
  [[ -d "$root/inference/profiles" ]] || return 0
  mapfile -d '' files < <(find "$root/inference/profiles" -maxdepth 1 -type f \
    \( -name '*.yaml' -o -name '*.yml' \) -print0 | sort -z)

  for file in "${files[@]}"; do
    ! grep -Eiq 'qwen' "$file" || fail "Qwen appears in production profile $file" || return
    public="$(value "$file" public_id)"
    worker="$(value "$file" worker_id)"
    revision="$(value "$file" model_revision)"
    image="$(value "$file" image)"
    case "$public|$worker" in
      'sgl/zai-org/GLM-5.2-FP8|zai-org/GLM-5.2-FP8')
        expected='ba978f7d347eaf65d22f1a86833408afdb953541' ;;
      'sgl/moonshotai/Kimi-K3|moonshotai/Kimi-K3')
        expected='9f62e4e9fffbd0a83ddd60e1c209d828994b3569' ;;
      *) fail "unapproved or missing identifiers in $file" || return ;;
    esac
    [[ "$revision" =~ ^[0-9a-f]{40}$ && "$revision" == "$expected" ]] ||
      fail "floating or incorrect Hugging Face revision in $file" || return
    [[ "$image" == "lmsysorg/sglang:v0.5.16@$sglang_digest" ]] ||
      fail "floating or incorrect OCI image in $file" || return
    if [[ "$public" == 'sgl/moonshotai/Kimi-K3' ]] &&
      grep -Eq '^[[:space:]]*enabled[[:space:]]*:[[:space:]]*true([[:space:]]|$)' "$file"; then
      fail "Kimi K3 cannot be enabled before live qualification" || return
    fi
    public_ids+=("$public")
    worker_ids+=("$worker")
  done

  [[ -z "$(printf '%s\n' "${public_ids[@]:-}" | sed '/^$/d' | sort | uniq -d)" ]] ||
    fail 'duplicate public identifier in production profiles' || return
  [[ -z "$(printf '%s\n' "${worker_ids[@]:-}" | sed '/^$/d' | sort | uniq -d)" ]] ||
    fail 'duplicate worker identifier in production profiles' || return
}

validate() {
  local root="$1" lock="$1/deps.lock.json"
  jq empty "$lock" >/dev/null 2>&1 || fail "invalid lock: $lock" || return
  ! jq -e '.inference_models | .. | strings | select(test("qwen"; "i"))' "$lock" >/dev/null ||
    fail 'Qwen remains in the hosted dependency lock' || return
  jq -e '
    .inference_models | type == "object" and length == 2 and
    ([.[].public_id] | sort == ["sgl/moonshotai/Kimi-K3", "sgl/zai-org/GLM-5.2-FP8"]) and
    ([.[].worker_id] | sort == ["moonshotai/Kimi-K3", "zai-org/GLM-5.2-FP8"]) and
    (to_entries | all(.value | keys | sort ==
      ["public_id", "repo_id", "repository", "revision", "worker_id"])) and
    (to_entries | all(
      .value.public_id == ("sgl/" + .value.worker_id) and
      .value.repo_id == .value.worker_id and
      .value.repository == ("https://huggingface.co/" + .value.worker_id + ".git") and
      (.value.revision | test("^[0-9a-f]{40}$")))) and
    .glm_5_2_fp8.revision == "ba978f7d347eaf65d22f1a86833408afdb953541" and
    .kimi_k3.revision == "9f62e4e9fffbd0a83ddd60e1c209d828994b3569"
  ' "$lock" >/dev/null || fail 'hosted lock is not the exact two-model boundary' || return
  jq -e --arg digest "$sglang_digest" '
    .sources.sglang.image.reference == "lmsysorg/sglang:v0.5.16" and
    .sources.sglang.image.digest == $digest and
    (.sources.sglang.image.digest | test("^sha256:[0-9a-f]{64}$"))
  ' "$lock" >/dev/null || fail 'SGLang image is not pinned to its approved OCI digest' || return
  [[ ! -e "$root/inference/sglang.sky.yaml" ]] ||
    fail 'obsolete executable Qwen manifest remains' || return
  validate_profiles "$root"
}

copy_boundary() {
  mkdir -p "$1/inference/profiles"
  cp "$repo_root/deps.lock.json" "$1/deps.lock.json"
  [[ ! -d "$repo_root/inference/profiles" ]] ||
    cp -a "$repo_root/inference/profiles/." "$1/inference/profiles/"
}

reject() {
  if validate "$2" >/dev/null 2>&1; then
    fail "negative mutation accepted: $1"
  fi
}

write_profile() {
  printf '%s\n' "public_id: $2" "worker_id: $3" "model_revision: $4" \
    "image: $5" "enabled: ${6:-false}" >"$1"
}

validate "$repo_root"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for name in qwen floating-hf floating-tag floating-digest third duplicate legacy \
  profile-revision profile-image profile-duplicate kimi-enabled; do
  root="$tmp/$name"
  copy_boundary "$root"
  case "$name" in
    qwen) filter='.inference_models.glm_5_2_fp8.worker_id="Qwen/Qwen3-32B-FP8"' ;;
    floating-hf) filter='.inference_models.glm_5_2_fp8.revision="main"' ;;
    floating-tag) filter='.sources.sglang.image.reference="lmsysorg/sglang:latest"' ;;
    floating-digest) filter='.sources.sglang.image.digest="sha256:latest"' ;;
    third) filter='.inference_models.third={public_id:"sgl/x/y",worker_id:"x/y",repository:"https://huggingface.co/x/y.git",repo_id:"x/y",revision:"0123456789012345678901234567890123456789"}' ;;
    duplicate) filter='.inference_models.kimi_k3.public_id=.inference_models.glm_5_2_fp8.public_id | .inference_models.kimi_k3.worker_id=.inference_models.glm_5_2_fp8.worker_id' ;;
    legacy)
      printf 'model: Qwen/Qwen3-32B-FP8\n' >"$root/inference/sglang.sky.yaml"
      reject "$name" "$root"
      continue ;;
    profile-revision)
      write_profile "$root/inference/profiles/glm.yaml" 'sgl/zai-org/GLM-5.2-FP8' \
        'zai-org/GLM-5.2-FP8' main "lmsysorg/sglang:v0.5.16@$sglang_digest" true
      reject "$name" "$root"
      continue ;;
    profile-image)
      write_profile "$root/inference/profiles/glm.yaml" 'sgl/zai-org/GLM-5.2-FP8' \
        'zai-org/GLM-5.2-FP8' 'ba978f7d347eaf65d22f1a86833408afdb953541' 'lmsysorg/sglang:latest' true
      reject "$name" "$root"
      continue ;;
    profile-duplicate)
      write_profile "$root/inference/profiles/a.yaml" 'sgl/zai-org/GLM-5.2-FP8' \
        'zai-org/GLM-5.2-FP8' 'ba978f7d347eaf65d22f1a86833408afdb953541' \
        "lmsysorg/sglang:v0.5.16@$sglang_digest"
      cp "$root/inference/profiles/a.yaml" "$root/inference/profiles/b.yaml"
      reject "$name" "$root"
      continue ;;
    kimi-enabled)
      write_profile "$root/inference/profiles/kimi.yaml" 'sgl/moonshotai/Kimi-K3' \
        'moonshotai/Kimi-K3' '9f62e4e9fffbd0a83ddd60e1c209d828994b3569' \
        "lmsysorg/sglang:v0.5.16@$sglang_digest" true
      reject "$name" "$root"
      continue ;;
  esac
  jq "$filter" "$root/deps.lock.json" >"$root/lock.tmp"
  mv "$root/lock.tmp" "$root/deps.lock.json"
  reject "$name" "$root"
done

printf 'hosted dependency verification passed\n'
