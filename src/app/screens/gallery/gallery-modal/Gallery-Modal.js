// react
import React from 'react';

// app
import './Gallery-Modal.scss';
import Loader from '../../../../assets/svg/loader.svg';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';

/**
 * Modal window for gallery items
 * @param openModal
 * @param setOpenModal
 * @returns {*}
 * @constructor
 */
const GalleryModal = ({ openModal, setOpenModal }) => {
	// src name
	const name = !openModal['cover'] ? openModal['id'] : openModal['cover'];

	return (
		<Dialog
			className="ig-gallery-modal"
			open={!!openModal}
			onClose={() => setOpenModal(false)}
			keepMounted>
			<div className="ig-content-wrapper">
				{/* Image */}
				{!!name && (
					<img
						style={{
							backgroundImage: `url(${Loader})`
						}}
						src={`//i.imgur.com/${name}.jpg`}
						alt={openModal['cover']} />
				)}

				<div className="ig-content">
					<div className="ig-title">
						{/* Title */}
						{!!openModal.title && (
							<h3>{openModal.title}</h3>
						)}
					</div>
					<div className="ig-info">
						{/* Content */}
						{!!openModal.description && (
							<div>{openModal.description}</div>
						)}

						{/* Up-votes */}
						{!!openModal['ups'] && (
							<Tooltip title="up-votes">
								<div className="ig-item">
									<FontAwesomeIcon icon={faArrowUp} />
									<p>{openModal['ups']}</p>
								</div>
							</Tooltip>
						)}

						{/* Down-votes */}
						{!!openModal['downs'] && (
							<Tooltip title="down-votes">
								<div className="ig-item">
									<FontAwesomeIcon icon={faArrowDown} />
									<p>{openModal['downs']}</p>
								</div>
							</Tooltip>
						)}

						{/* Score */}
						{!!openModal['score'] && (
							<Tooltip title="score">
								<div className="ig-item">
									<FontAwesomeIcon icon={faHeart} />
									<p>{openModal['score']}</p>
								</div>
							</Tooltip>
						)}

						{/* Views */}
						{!!openModal['views'] && (
							<Tooltip title="views">
								<div className="ig-item">
									<FontAwesomeIcon icon={faEye} />
									<p>{openModal['views']}</p>
								</div>
							</Tooltip>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
};
export default GalleryModal;
