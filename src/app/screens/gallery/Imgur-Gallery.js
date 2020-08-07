// react
import React from 'react';

// app
import GalleryFilters from './gallery-filters/Gallery-Filters';
import GalleryList from './gallery-list/Gallery-List';
import ScrollTopTop from '../../components/scroll-to-top/Scroll-To-Top';

/**
 * Imgur Gallery
 * @returns {*}
 * @constructor
 */
const ImgurGallery = () => {
	return (
		<section className="ig-wrapper">
			{/* Gallery Filters */}
			<GalleryFilters />

			{/* Gallery List */}
			<GalleryList />

			{/* Scroll To Top */}
			<ScrollTopTop />
		</section>
	);
};
export default ImgurGallery;
