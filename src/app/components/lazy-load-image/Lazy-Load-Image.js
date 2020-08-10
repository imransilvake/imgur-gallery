// react
import React, { useState, useRef, useEffect } from 'react';

// app
import './Lazy-Load-Image.scss';

/**
 * lazy load image using Intersection Observer API
 * @param src
 * @param alt
 * @returns {*}
 * @constructor
 */
const LazyLoadImage = ({ src, alt }) => {
	// hooks
	const [showImage, setShowImage] = useState(false);
	const placeHolderRef = useRef(null);

	useEffect(() => {
		// intersection observer
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				// return when not intersecting
				if (!entry.isIntersecting) return;

				// set hook: setShowImage
				setShowImage(true);

				// disconnect
				observer.disconnect();
			});
		});

		// observe the node
		io.observe(placeHolderRef.current);

		// cleanup
		return () => io && io.root !== undefined && io.disconnect();
	}, [setShowImage]);

	// return
	return (showImage) ? (
		<img src={src} alt={alt} />
	) : (
		<div data-testid="ig-placeholder" className="ig-placeholder" ref={placeHolderRef} />
	);
};
export default LazyLoadImage;
