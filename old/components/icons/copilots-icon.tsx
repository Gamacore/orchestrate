export function CopilotsIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect x="3" y="11" width="18" height="10" rx="2" />
			<circle cx="9" cy="16" r="1" fill="currentColor" />
			<circle cx="15" cy="16" r="1" fill="currentColor" />
			<path d="M8 11V9a4 4 0 0 1 8 0v2" />
		</svg>
	);
}
