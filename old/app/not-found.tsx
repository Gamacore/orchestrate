import { Squircle } from '@squircle-js/react';
import { ArctenLogo } from '@/components/icons/arcten-logo';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-8">
			<div className="text-center">
				<div className="mb-6 flex justify-center">
					<ArctenLogo className="h-12 w-12" />
				</div>
				<h1 className="mb-2 text-6xl font-medium">404</h1>
				<p className="mb-8 text-sm text-muted">This page doesn't exist.</p>
				<Squircle asChild cornerRadius={6} cornerSmoothing={1}>
					<Link
						href="/"
						className="inline-flex items-center gap-1 bg-foreground/5 px-3 py-2 text-sm leading-none transition-colors hover:bg-foreground/10"
					>
						Go home
					</Link>
				</Squircle>
			</div>
		</div>
	);
}
