/**
 * scroll to top
 */
const scrollToTop = () => {
	const scrollSpeed = 400;
	const scrollDuration = scrollSpeed / 10;
	const scrollStep = -window.scrollY / scrollDuration;
	const scrollInterval = setInterval(() => {
		if (window.scrollY !== 0) {
			window.scrollBy(0, scrollStep);
		} else {
			clearInterval(scrollInterval);
		}
	}, 15);
};
export default scrollToTop;
