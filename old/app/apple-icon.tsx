import { ImageResponse } from 'next/og';

export const size = {
	width: 180,
	height: 180
};
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				background: '#1c1917',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<svg width="120" height="60" viewBox="0 0 100 50" fill="none">
				<path d="M0 50 A50 50 0 0 1 100 50 L0 50 Z" fill="#e7e5e4" />
			</svg>
		</div>,
		{
			...size
		}
	);
}
