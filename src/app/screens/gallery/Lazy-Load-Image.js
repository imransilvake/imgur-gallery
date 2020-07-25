// react
import React, { useState, useRef, useEffect } from 'react';

/**
 * lazy load image
 * @param src
 * @param alt
 * @returns {*}
 * @constructor
 */
const LazyLoadImage = ({ src, alt }) => {
	const [showImage, setShowImage] = useState(false);
	const placeHolderRef = useRef(null);

	useEffect(() => {
		const io = new IntersectionObserver((entries, imgObserver) => {
			entries.forEach((entry) => {
				// return when not intersecting
				if (!entry.isIntersecting) return;

				// set hook: setShowImage
				setShowImage(true);

				// disconnect
				imgObserver.disconnect();
			});
		});

		// disconnect
		io.observe(placeHolderRef.current);

		// cleanup
		return () => io.disconnect();
	}, []);

	// return
	return (showImage) ? (
		<img src={src} alt={alt} />
	) : (
		<div style={{ display: 'block', height: '200px' }} ref={placeHolderRef} />
	);
};
export default LazyLoadImage;