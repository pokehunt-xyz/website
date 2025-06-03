import { useEffect } from 'react';

export default function ExternalRedirect({ url }: { url: string }) {
	useEffect(() => {
		window.location.href = url;
	}, [url]);

	return null;
}
