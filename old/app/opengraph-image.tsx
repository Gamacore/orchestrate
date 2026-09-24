import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Arcten - AI researchers and engineers';
export const size = {
	width: 1200,
	height: 630
};
export const contentType = 'image/png';

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				background: '#1c1917',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '24px'
			}}
		>
			{/* Arcten Logo - Half circle */}
			<svg width="120" height="60" viewBox="0 0 100 50" fill="none">
				<path d="M0 50 A50 50 0 0 1 100 50 L0 50 Z" fill="#e7e5e4" />
			</svg>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '12px'
				}}
			>
				<span
					style={{
						fontSize: '64px',
						fontWeight: 600,
						color: '#e7e5e4',
						letterSpacing: '-0.02em'
					}}
				>
					Arcten
				</span>
				<span
					style={{
						fontSize: '24px',
						color: '#a8a29e'
					}}
				>
					AI researchers & engineers
				</span>
			</div>
		</div>,
		{
			...size
		}
	);
}
