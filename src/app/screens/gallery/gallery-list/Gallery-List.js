// react
import React, {
	useCallback, useEffect, useRef, useState
} from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { proxySelector, fetchApi } from '../../../slices/proxy';
import { gallerySelector, galleryNextPage } from '../../../slices/gallery';

// uuid
import { v4 as uuid4 } from 'uuid';

// app
import './Gallery-List.scss';
import Loader from '../../../../assets/images/loader.gif';
import ScrollTop from '../../../../assets/svg/scroll-top.svg';
import { AppServices } from '../../../../app.config';
import scrollToTop from '../../../utilities/helpers/Helper';
import GalleryModal from '../gallery-modal/Gallery-Modal';
import LazyLoadImage from '../Lazy-Load-Image';
import { Container } from '@material-ui/core';

const GalleryList = () => {
	// hooks
	const dispatch = useDispatch();
	const {
		loading, finished, response, errors
	} = useSelector(proxySelector);
	const { galleryParams } = useSelector(gallerySelector);
	const [openModal, setOpenModal] = useState(false);
	const observer = useRef();

	// fetch api data
	useEffect(() => {
		// fetch api
		dispatch(fetchApi(
			AppServices.GALLERY.GET_GALLERY.URL, { ...galleryParams }
		));
	}, [dispatch, galleryParams]);

	/**
	 * implement infinite scrolling
	 * @type {*}
	 */
	const lastItemFromGalleryRef = useCallback((node) => {
		// skip if loading
		if (loading) return;

		// disconnect observer
		if (observer.current) observer.current.disconnect();

		// observer
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !finished) {
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
				alt={payload.alt}
				src={payload.src} />
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
					{response['data'].map((item, index) => (
						<button
							ref={(response['data'].length - 15) === index ? lastItemFromGalleryRef : null}
							type="button"
							className="ig-item-button"
							key={uuid4()}
							onClick={() => setOpenModal(item)}>
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
			{/* Content | Loading | Error */}
			<div className="ig-content">
				{/* Gallery */}
				{ displayGallery() }

				{/* Loader */}
				{loading && (
					<div className="ig-load-more">
						<img src={Loader} alt="load more" />
					</div>
				)}
			</div>

			{/* Scroll to Top */}
			<div className="ig-page-top">
				<button type="button" onClick={scrollToTop}>
					<img src={ScrollTop} alt="load more" />
				</button>
			</div>

			{/* Gallery Item Modal */}
			<GalleryModal openModal={openModal} setOpenModal={setOpenModal} />
		</Container>
	);
};
export default GalleryList;
