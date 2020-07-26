// react
import React from 'react';

// app
import './Imgur-Gallery.scss';
import Logo from '../../../assets/svg/logo.svg';
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
			{/* Header */}
			<header className="ig-header">
				<img src={Logo} alt="app-logo" />
			</header>

			{/* Gallery Filters */}
			<GalleryFilters />

			{/* Gallery List */}
			<GalleryList />
		</section>
	);
};
export default ImgurGallery;
