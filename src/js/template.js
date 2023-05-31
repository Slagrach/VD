import {_removeClasses, isMobile} from "./files/functions";

window.onload = function () {
	document.addEventListener('click', docAction);
}

function docAction(e) {
	const clickTarget = e.target;
	if (window.innerWidth < 768 && isMobile.any()) {
		if (clickTarget.classList.contains('elem')) {
			clickTarget.closest('.elem').classList.toggle('active');
		}
		if (!clickTarget.closest('.elem') && document.querySelectorAll('.elem.active').length > 0) {
			_removeClasses(document.querySelectorAll('.elem.active'), 'active');
		}
	}
}
