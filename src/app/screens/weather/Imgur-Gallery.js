// react
import React from 'react';

// app
import './Imgur-Gallery.scss';
import Logo from '../../../assets/svg/logo.svg';
import GalleryList from './gallery-list/Gallery-List';

const ImgurGallery = () => {
	return (
		<section className="ig-wrapper">
			{/* Header */}
			<header className="ig-header">
				<img src={Logo} alt="app-logo" />
			</header>

			{/* Gallery */}
			<GalleryList />
		</section>
	);
};
export default ImgurGallery;
