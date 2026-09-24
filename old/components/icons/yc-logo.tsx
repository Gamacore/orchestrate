export function YCLogo(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-5.064l4.3-7.708h-1.583l-3.508 6.649-3.508-6.649H6.951z" />
		</svg>
	);
}
