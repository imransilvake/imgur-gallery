// react
import React, { useEffect, useState } from 'react';

// app
import './Imgur-Gallery.scss';
import Logo from '../../../assets/svg/logo.svg';
import GalleryFilters from './gallery-filters/Gallery-Filters';
import GalleryList from './gallery-list/Gallery-List';
import scrollToTop from '../../utilities/helpers/Helper';
import ScrollTop from '../../../assets/svg/scroll-top.svg';

/**
 * Imgur Gallery
 * @returns {*}
 * @constructor
 */
const ImgurGallery = () => {
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

	return (
		<section className="ig-wrapper">
			{/* Header */}
			<header className="ig-header">
				<img src={Logo} alt="app-logo" />
			</header>

			{/* Gallery Filters */}
			<GalleryFilters />

			{/* Gallery List */}
			<GalleryList />

			{/* Scroll To Top */}
			{scrollView && (
				<div className="ig-page-top">
					<button type="button" onClick={scrollToTop}>
						<img src={ScrollTop} alt="load more" />
					</button>
				</div>
			)}
		</section>
	);
};
export default ImgurGallery;
