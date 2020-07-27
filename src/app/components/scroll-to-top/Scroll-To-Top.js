// react
import React, { useEffect, useState } from 'react';

// app
import ScrollTop from '../../../assets/svg/scroll-top.svg';
import scrollToTop from './scrollToTop';

/**
 * scroll to top
 * @returns {*}
 * @constructor
 */
const ScrollTopTop = () => {
	const [scrollView, setScrollView] = useState(false);

	useEffect(() => {
		// validate scroll position
		const handleScroll = () => {
			if (window.scrollY > 250) {
				if (!scrollView) {
					// set hook: setScrollView
					setScrollView(true);
				}
			} else if (scrollView) {
				// set hook: setScrollView
				setScrollView(false);
			}
		};

		// listener
		window.addEventListener('scroll', handleScroll);

		// clean up
		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollView, setScrollView]);

	return scrollView && (
		<div className="ig-page-top">
			<button type="button" onClick={scrollToTop}>
				<img src={ScrollTop} alt="load more" />
			</button>
		</div>
	);
};
export default ScrollTopTop;
