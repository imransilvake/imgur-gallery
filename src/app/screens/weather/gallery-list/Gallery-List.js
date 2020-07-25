// react
import React, { useEffect, useRef } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { proxySelector, fetchApi } from '../../../slices/proxy';
import { gallerySelector, galleryNextPage } from '../../../slices/gallery';

// lazy-load image
import { LazyLoadImage } from 'react-lazy-load-image-component';

// app
import './Gallery-List.scss';
import Loader from '../../../../assets/images/loader.gif';
import ScrollTop from '../../../../assets/svg/scroll-top.svg';
import { AppServices } from '../../../../app.config';
import scrollToTop from '../../../utilities/helpers/Helper';
import { Container } from '@material-ui/core';

const GalleryList = () => {
	// hooks
	const dispatch = useDispatch();
	const { response, loading, errors } = useSelector(proxySelector);
	const { galleryParams } = useSelector(gallerySelector);
	const pageBottomPrevY = useRef(0);

	// fetch api data
	useEffect(() => {
		console.log('called');

		// fetch api
		dispatch(fetchApi(
			AppServices.GALLERY.GET_GALLERY.URL, { ...galleryParams }
		));
	}, [dispatch, galleryParams]);

	// detect end of page and call next page
	useEffect(() => {
		// OI Options
		const options = {
			root: null,
			rootMargin: '0px 0px 200px 0px',
			threshold: [0.98, 0.99, 1]
		};

		// validate intersection observer
		if (window.IntersectionObserver) {
			// observer
			const observer = new IntersectionObserver((entries) => {
				const firstEntry = entries[0];
				const { y } = firstEntry.boundingClientRect;

				// we don't want to load more images when we scroll up and then down again.
				// skip calling on top of page
				if (pageBottomPrevY.current > y && document.documentElement.scrollTop > 200) {
					dispatch(galleryNextPage());
				}

				// update value
				// note: 500 helps prevent additional nextPage() calls
				pageBottomPrevY.current = y - 500;
			}, options);

			// observe element
			const target = document.querySelector('#page-bottom');
			observer.observe(target);
		}
	}, [dispatch]);

	/**
	 * set and lazy-load item image
	 * @param item
	 */
	const setImage = (item) => {
		const payload = {
			src: `//i.imgur.com/${item['cover']}_d.jpg?maxwidth=300&shape=thumb`,
			alt: item['cover'],
			width: 200,
			height: 200
		};
		return (
			<LazyLoadImage
				alt={payload.alt}
				height={payload.height}
				src={payload.src}
				width={payload.width} />
		);
	};

	/**
	 * display gallery images
	 */
	const displayGallery = () => {
		// gallery items
		if (response && response && response['data']) {
			return (
				<div className="ig-grid ig-items">
					{
						response['data'].map((item, index) => (
							item['cover'] && (
								<div className="ig-item" key={`${item.id}-${index}`}>
									{/* Image / Video */}
									{ setImage(item) }

									{/* Title */}
									<h4>{item.title}</h4>
								</div>
							)
						))
					}
				</div>
			);
		}

		// error
		return errors && (
			<div className="ig-error">
				{ errors['status'] && (<h3>{ errors['status'] }</h3>) }
				{ errors['data'] && errors['data']['error'] && (<p>{ errors['data']['error'] }</p>) }
			</div>
		);
	};

	return (
		<Container maxWidth="md" className="ig-gallery-list">
			{/* Content | Loading | Error */}
			<div className="ig-content">
				{/* Gallery */}
				{ displayGallery() }

				{/* Loader */}
				{
					loading && (
						<div className="ig-load-more">
							<img src={Loader} alt="load more" />
						</div>
					)
				}
			</div>

			{/* Scroll to Top */}
			<div className="ig-page-top">
				<button type="button" onClick={scrollToTop}>
					<img src={ScrollTop} alt="load more" />
				</button>
			</div>

			{/* Page End */}
			<div id="page-bottom" />
		</Container>
	);
};
export default GalleryList;
