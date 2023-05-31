import './files/functions'
import '../pug/static/header/burger/burger'
import {_removeClasses} from "./files/functions";

let scrollPos = window.scrollY;
const header = document.querySelector("header");
// const introBody = document.querySelector('.intro__body');
const scrollChange = 1;

const add_class_on_scroll = () => header.classList.add("_sticky");
const remove_class_on_scroll = () => header.classList.remove("_sticky");
if (document.documentElement.clientWidth > 992) {
	window.addEventListener('scroll', function () {
		scrollPos = window.scrollY;
		if (scrollPos >= scrollChange) {
			add_class_on_scroll()
		} else {
			remove_class_on_scroll()
		}
// 	const navigationHeight = header.offsetHeight;
// 	document.documentElement.style.setProperty(
// 		'--scroll-padding',
// 		navigationHeight + 'px'
// 	)
// });
//
// function getAbsPosition(element) {
// 	let rect = element.getBoundingClientRect();
// 	return {x: rect.left, y: rect.top}
// }
//
// let pos = 200;
// let coords = getAbsPosition(introBody);
// if (coords.y < pos) {
// 	header.classList.add("_color")
	});
}
const introTitle = document.querySelector('.intro__title i');
const introTitleNote = document.querySelector('.intro__title-note');

// window.onload = function () {
// 	document.addEventListener('click', documentClick);
//
// 	function documentClick(e) {
// 		let targetEvent = e.target;
// 		if (targetEvent.classList.contains('footnote')) {
// 			targetEvent.closest('.intro__title-main').classList.add('_show');
// 		}
// 		if (!targetEvent.closest('.intro__title-main') && document.querySelectorAll('.intro__title-main._show').length > 0) {
// 			_removeClasses(document.querySelectorAll('.intro__title-main._show'), '_show');
// 		}
// 	}
// }

const forms = document.querySelectorAll('form');
for (let i = 0; i < forms.length; i++) {
	const telSelector = forms[i].querySelectorAll('input[type="tel"]');
	telSelector.forEach(item => {
		const inputMask = new Inputmask('+7 (999) 999-9999');
		inputMask.mask(item);
	})
}

$('.phone-field').inputmask("+7(999) 999-99-99");
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\) \d{3}-\d{2}-\d{2}/g.test(value);
});
var form = $('.help__form');
form.validate({
	errorClass: 'error',
	validClass: 'success',
	errorElement: 'span',
});
$.validator.addClassRules({'phone-field': {checkMaskPhone: true,}});


$('.contact-tel').inputmask("+7(999) 999-99-99");
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\) \d{3}-\d{2}-\d{2}/g.test(value);
});
var form = $('.contacts__form');
form.validate({
	errorClass: 'error',
	validClass: 'success',
	errorElement: 'span',
});
$.validator.addClassRules({'contact-tel': {checkMaskPhone: true,}});


// Проверка на валидность формы при отправке, если нужно
// form.submit(function (e) {
// 	e.preventDefault();
// 	if (form.valid()) {
// 		alert('Форма отправлена');
// 	}
// 	return;
// });


// import '../pug/includes/popup/popup'
// import './files/form'
import '../pug/includes/up/up'

// if you're using a bundler, first import:
// import Headroom from "headroom.js";
// grab an element
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();
