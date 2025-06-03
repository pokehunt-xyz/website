import { node, string } from 'prop-types';

export default function Image({ src, fallback, type = 'image/webp', ...delegated }) {
	return (
		<picture>
			<source srcSet={src} type={type} />
			<img src={fallback} {...delegated} />
		</picture>
	);
}

Image.propTypes = {
	src: node.isRequired,
	fallback: node.isRequired,
	type: string.isRequired,
	delegated: node,
};
