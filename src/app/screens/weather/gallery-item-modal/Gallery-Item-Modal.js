// react
import React from 'react';

// app
import './Gallery-Item-Modal.scss';
import Loader from '../../../../assets/svg/loader.svg';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

/**
 * transition
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const Transition = React.forwardRef((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

const GalleryItemModal = ({ openModal, setOpenModal }) => {
	// src name
	const name = !openModal['cover'] ? openModal['id'] : openModal['cover'];

	return (
		<Dialog
			className="ig-gallery-modal"
			open={!!openModal}
			TransitionComponent={Transition}
			onClose={() => setOpenModal(false)}
			keepMounted>
			<div className="ig-content-wrapper">
				{/* Image */}
				{!!name && (
					<img
						style={{ backgroundImage: `url(${Loader})` }}
						src={`//i.imgur.com/${name}.jpg`}
						alt={openModal['cover']} />
				)}

				<div className="ig-content">
					<div className="ig-title">
						{/* Title */}
						{!!openModal.title && (
							<div>{openModal.title}</div>
						)}
					</div>
					<div className="ig-info">
						{/* Content */}
						{!!openModal.description && (
							<div>{openModal.description}</div>
						)}
						{!!openModal['ups'] && (
							<div>
								<h4>Up Votes:</h4>
								<p>{openModal['ups']}</p>
							</div>
						)}
						{!!openModal['downs'] && (
							<div>
								<h4>Down Votes:</h4>
								<p>{openModal['downs']}</p>
							</div>
						)}
						{!!openModal['score'] && (
							<div>
								<h4>Score:</h4>
								<p>{openModal['score']}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
};
export default GalleryItemModal;
