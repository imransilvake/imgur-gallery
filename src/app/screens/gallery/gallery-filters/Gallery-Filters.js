// react
import React, { useEffect, useRef, useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { galleryFilters, galleryReset, initialState, SECTION_DEFAULT } from '../../../slices/gallery/gallery';
import { proxyReset } from '../../../slices/proxy/proxy';

// material
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// app
import './Gallery-Filters.scss';

/**
 * Filters for Imgur gallery
 * @returns {*}
 * @constructor
 */
const GalleryFilters = () => {
	// initialize
	const isFirstRun = useRef(true);

	// hooks
	const dispatch = useDispatch();
	const [state, setState] = useState({
		viral: initialState.galleryParams.queryParams.showViral,
		section: initialState.galleryParams.keyValues.section,
		sort: initialState.galleryParams.keyValues.sort,
		window: initialState.galleryParams.keyValues.window
	});

	useEffect(() => {
		// skip first call
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		// reset proxy state
		dispatch(proxyReset());

		// reset gallery state
		dispatch(galleryReset());

		// apply filters
		dispatch(galleryFilters(state));
	}, [dispatch, state]);

	/**
	 * on handle change event
	 * @param event
	 */
	const handleChange = (event) => {
		// destruct
		const { name, value, checked } = event.target;

		// validate switch (boolean) vs select (string)
		const result = (checked !== undefined) ? checked : value;

		// validate sort on change of section
		const part = (name === 'section' || name === 'sort') ? {
			[name]: result,
			sort: {
				value: name === 'sort' ? result : state.sort.value,
				disabled: name === 'section' ? result !== SECTION_DEFAULT : state.sort.disabled
			}
		} : {
			[name]: result
		};

		// set hook: setState
		setState({
			...state,
			...part
		});
	};

	return (
		<Container maxWidth="md" className="ig-gallery-filters">
			<form data-testid="ig-filter-form">
				<div className="ig-content">
					{/* Left */}
					<div className="ig-left">
						<FormControlLabel
							className="ig-switch"
							classes={{
								label: 'ig-label'
							}}
							control={(
								<Switch
									name="viral"
									color="primary"
									onChange={handleChange}
									checked={state.viral} />
							)}
							label="Show Viral"
							data-testid="ig-switch" />
					</div>

					{/* Right */}
					<div className="ig-right">
						<div className="ig-item">
							<FormHelperText className="ig-helper">Section</FormHelperText>
							<Select
								variant="filled"
								name="section"
								value={state.section}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="hot">Hot</MenuItem>
								<MenuItem value="top">Top</MenuItem>
								<MenuItem value="user">User</MenuItem>
							</Select>
						</div>

						<div className="ig-item">
							<FormHelperText className="ig-helper">Sort</FormHelperText>
							<Select
								variant="filled"
								name="sort"
								value={state.sort.value}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="viral">Viral</MenuItem>
								<MenuItem value="top">Top</MenuItem>
								<MenuItem value="time">Time</MenuItem>
								<MenuItem
									value="rising"
									disabled={state.sort.disabled}
									className="sort-rising">
									Rising
								</MenuItem>
							</Select>
						</div>

						<div className="ig-item">
							<FormHelperText className="ig-helper">Window</FormHelperText>
							<Select
								variant="filled"
								name="window"
								value={state.window}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="day">Day</MenuItem>
								<MenuItem value="week">Week</MenuItem>
								<MenuItem value="month">Month</MenuItem>
								<MenuItem value="year">Year</MenuItem>
								<MenuItem value="all">All</MenuItem>
							</Select>
						</div>
					</div>
				</div>
			</form>
		</Container>
	);
};
export default GalleryFilters;
