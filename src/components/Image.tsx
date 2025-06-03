import type { ImgHTMLAttributes } from 'react';

export default function Image({
	src,
	fallback,
	type = 'image/webp',
	...delegated
}: { src: string; fallback: string; type: string } & ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<picture>
			<source srcSet={src} type={type} />
			<img src={fallback} {...delegated} />
		</picture>
	);
}
