// react
import React, { useCallback, useEffect, useRef, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { proxySelector, fetchApi } from '../../../slices/proxy/proxy';
import { gallerySelector, galleryNextPage } from '../../../slices/gallery/gallery';

// material
import { Container } from '@material-ui/core';

// app
import './Gallery-List.scss';
import Loader from '../../../../assets/images/loader.gif';
import { AppServices } from '../../../../app.config';
import GalleryModal from '../gallery-modal/Gallery-Modal';
import LazyLoadImage from '../../../components/lazy-load-image/Lazy-Load-Image';

/**
 * Display gallery list
 * @returns {*}
 * @constructor
 */
const GalleryList = () => {
	// hooks
	const dispatch = useDispatch();
	const { loading, finished, response, errors } = useSelector(proxySelector);
	const { galleryParams } = useSelector(gallerySelector);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		// fetch api
		dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, galleryParams));
	}, [dispatch, galleryParams]);

	/**
	 * implement infinite scrolling
	 * @type {*}
	 */
	const observer = useRef();
	const lastItemFromGalleryRef = useCallback((node) => {
		// skip if loading
		if (loading) return;

		// disconnect observer
		if (observer.current && observer.current.root !== undefined) {
			observer.current.disconnect();
		}

		// intersection observer
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !finished) {
				// call next set of items
				dispatch(galleryNextPage());
			}
		});

		// observe node
		if (node) observer.current.observe(node);
	}, [dispatch, loading, finished]);

	/**
	 * set and lazy-load item image
	 * @param item
	 */
	const setImage = (item) => {
		const name = !item['cover'] ? item['id'] : item['cover'];
		const thumbnail = `//i.imgur.com/${name}_d.jpg?maxwidth=300&shape=thumb`;
		const payload = {
			src: thumbnail,
			alt: name
		};
		return (
			<LazyLoadImage
				src={payload.src}
				alt={payload.alt} />
		);
	};

	/**
	 * display gallery images
	 *
	 * note:
	 * some gallery items are repeating so we can't use item['id'] as a unique key.
	 * the order of gallery items is not changing.
	 * therefore it is fine to use index as key to stop unnecessary renders
	 */
	const displayGallery = () => {
		// gallery
		if (response && response['data']) {
			return (
				<div className="ig-grid ig-items">
					{response['data'].map((item, index) => (
						<button
							type="button"
							className="ig-item-button"
							key={`${item.id}-${index}`}
							ref={(response['data'].length - 15) === index ? lastItemFromGalleryRef : null}
							onClick={() => setOpenModal(item)}
							data-testid={`ig-item-button-${index}`}>
							<div className="ig-item">
								{/* Image */}
								{ setImage(item) }

								{/* Title */}
								{item.title && <h4 className="ig-ellipses">{item.title}</h4>}
							</div>
						</button>
					))}
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
			{/* Gallery | Error | Loader */}
			<div className="ig-content">
				{/* Gallery */}
				{ displayGallery() }

				{/* Loader */}
				{!finished && (
					<div className="ig-load-more">
						<img src={Loader} alt="load more" />
					</div>
				)}
			</div>

			{/* Gallery Modal */}
			{openModal && <GalleryModal openModal={openModal} setOpenModal={setOpenModal} />}
		</Container>
	);
};
export default GalleryList;
