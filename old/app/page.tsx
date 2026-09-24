'use client';

import { Squircle } from '@squircle-js/react';
import { ChopinLogo } from '@/components/icons/chopin-logo';
import { CopilotsIcon } from '@/components/icons/copilots-icon';
import { YCLogo } from '@/components/icons/yc-logo';
import { LocationIcon } from '@/components/icons/location-icon';
import { MailIcon } from '@/components/icons/mail-icon';
import { ArctenLogo } from '@/components/icons/arcten-logo';
import { HeroAscii } from '@/components/hero_ascii';
import { Footer } from '@/components/footer';

const CONTENT_WIDTH = 560;

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<a href={`#${id}`} className="group">
			<Squircle asChild cornerRadius={6} cornerSmoothing={1}>
				<h2
					id={id}
					className="mb-4 -ml-1 inline-flex items-center gap-1 px-1 py-1 text-sm tracking-wide text-muted uppercase transition-colors hover:bg-foreground/5"
				>
					{children}
					<span className="opacity-0 transition-opacity group-hover:opacity-50">#</span>
				</h2>
			</Squircle>
		</a>
	);
}

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<main
				className="mx-auto flex flex-1 flex-col justify-center px-8 py-16"
				style={{ width: CONTENT_WIDTH, maxWidth: '100%' }}
			>
				{/* Header */}
				<header className="mb-8">
					<div className="mb-3 flex items-center gap-3">
						<ArctenLogo className="h-6 w-6" />
						<span className="text-sm font-medium">Arcten</span>
					</div>
					<p className="text-sm leading-relaxed text-muted">
						We are AI engineers & researchers{' '}
						<Squircle asChild cornerRadius={6} cornerSmoothing={1}>
							<a
								href="https://www.ycombinator.com/companies/arcten"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 bg-foreground/5 px-1 py-1 leading-none transition-all hover:bg-foreground/10 hover:text-foreground"
							>
								<YCLogo className="h-3 w-3" />
								backed by Y Combinator
							</a>
						</Squircle>
						.
					</p>
				</header>

				{/* ASCII Art */}
				<div className="mb-8">
					<HeroAscii />
					<div className="mt-2 flex justify-center">
						<span className="inline-flex items-center gap-1 text-sm text-muted">
							<LocationIcon className="h-3 w-3" />
							We're based in San Francisco!
						</span>
					</div>
				</div>

				{/* Products */}
				{false && (
					<section id="products" className="mb-8">
						<SectionHeading id="products">Products</SectionHeading>

						<div className="grid grid-cols-2 gap-4">
							<Squircle asChild cornerRadius={12} cornerSmoothing={1}>
								<a
									href="https://chopin.so"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-foreground/5 p-4 transition-colors hover:bg-foreground/10"
								>
									<div className="mb-1 flex items-center gap-1.5 text-sm font-medium">
										<ChopinLogo className="h-3.5 w-3.5" />
										Chopin
									</div>
									<p className="text-xs text-muted">
										orchestrate flocks of (any) multiplayer coding agents
									</p>
								</a>
							</Squircle>

							<Squircle asChild cornerRadius={12} cornerSmoothing={1}>
								<a
									href="https://arcten.dev"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-foreground/5 p-4 transition-colors hover:bg-foreground/10"
								>
									<div className="mb-1 flex items-center gap-1.5 text-sm font-medium">
										<CopilotsIcon className="h-3.5 w-3.5" />
										Concierge
									</div>
									<p className="text-xs text-muted">
										embed a user-facing action taking agent into your application
									</p>
								</a>
							</Squircle>
						</div>
					</section>
				)}

				{/* Hiring */}
				<section id="hiring">
					<SectionHeading id="hiring">Hiring</SectionHeading>
					<p className="text-sm leading-relaxed text-muted">
						We're a small, deeply technical team with roots in AI research at Caltech. We're not
						actively hiring, but make exceptions for exceptional people.
					</p>
					<p className="mt-3 text-sm text-muted">
						Reach out to{' '}
						<Squircle asChild cornerRadius={6} cornerSmoothing={1}>
							<a
								href="mailto:founders@arcten.com"
								className="inline-flex items-center gap-1 bg-foreground/5 px-1 py-1 leading-none text-foreground transition-colors hover:bg-foreground/10"
							>
								<MailIcon className="h-3 w-3" />
								founders[at]arcten.com
							</a>
						</Squircle>
					</p>
				</section>
			</main>

			<Footer contentWidth={CONTENT_WIDTH} />
		</div>
	);
}
