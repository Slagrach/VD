//Добавление класса lock для body при открытии меню=====================================================================
import {body_lock, unlock} from '../../../../js/files/functions';

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('_lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("_lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("_lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

//Добавление класса бургеру===================================================================================
let iconMenu = document.querySelector(".icon-menu");
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock();
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		}
	});
}
//Прокрутка по клику и закрытие меню============================================================================
const menuLinks = document.querySelectorAll('._link[data-link]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.link && document.querySelector(menuLink.dataset.link)) {
			const linkBlock = document.querySelector(menuLink.dataset.link);
			const linkBlockValue = linkBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			if (iconMenu.classList.contains('_active')) {
				if (unlock) {
					body_lock();
					iconMenu.classList.toggle('_active');
					menuBody.classList.toggle('_active');
				}
			}
			window.scrollTo({
				top: linkBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// const navigation = document.querySelector('.header');
// const navigationHeight = navigation.offsetHeight;
// document.documentElement.style.setProperty(
// 	'--scroll-padding',
// 	navigationHeight + 'px'
// )
