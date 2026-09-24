export function ArctenLogo(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 100 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M0 50 A50 50 0 0 1 100 50 L0 50 Z" fill="currentColor" />
		</svg>
	);
}
