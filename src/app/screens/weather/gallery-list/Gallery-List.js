// react
import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector, fetchApi } from '../../../slices/proxy';

// app
import './Gallery-List.scss';
import Loader from '../../../../assets/images/loader.gif';
import { AppServices } from '../../../../app.config';
import { scrollToTop } from '../../../utilities/helpers/Helper';
import { CircularProgress, Container } from '@material-ui/core';

const GalleryList = () => {
	// initial
	const initialPayload = {
		queryParams: {
			showViral: true,
			album_previews: true
		},
		pathValues: {
			section: 'hot',
			sort: 'viral',
			window: 'day',
			page: 0
		}
	};

	// hooks
	const dispatch = useDispatch();
	const { response, loading, errors } = useSelector(dataSelector);
	const [apiPayload, setApiPayload] = useState(initialPayload);

	useEffect(() => {
		// fetch api data
		dispatch(fetchApi(AppServices.GALLERY.GET_GALLERY.URL, apiPayload));
	}, [apiPayload, dispatch]);

	/**
	 * set item image
	 * @param item
	 */
	const setImage = (item) => {
		if (item['cover']) {
			return `//imgur.com/${item['cover']}.jpg`;
		}
		return item.link.replace('http://', '//');
	};

	/**
	 * display gallery images
	 */
	const displayGallery = () => {
		// loader
		if (loading) {
			return <div className="ig-loader"><CircularProgress /></div>;
		}

		// gallery items
		if (response && response && response['data']) {
			return response && response['data'] && (
				<div className="ig-grid ig-items">
					{
						response['data'].map((item) => (
							<div className="ig-item" key={item.id}>
								{/* Image / Video */}
								<img src={setImage(item)} alt={item['cover']} />

								{/* Title */}
								<h4>{item.title}</h4>
							</div>
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
			{/* Gallery */}
			<div className="ig-content">
				{ displayGallery() }

				{/* Load More */}
				{
					initialPayload && (
						<div className="ig-load-more">
							<img src={Loader} alt="load more" />
						</div>
					)
				}
			</div>

			{/* Load More */}
			<div className="ig-page-top">
				<button type="button" onClick={scrollToTop}>back to top</button>
			</div>
		</Container>
	);
};
export default GalleryList;
