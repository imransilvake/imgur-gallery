// react
import React from 'react';

// app
import GalleryFilters from './gallery-filters/Gallery-Filters';
import GalleryList from './gallery-list/Gallery-List';

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
		</section>
	);
};
export default ImgurGallery;
