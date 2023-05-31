const tabs = document.getElementById('tabs');
const popupTab = document.querySelectorAll('.popup__tab');
const buttons = document.getElementById('buttons');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const btnPrev = document.querySelector('.popup__btn_prev');
const btnNext = document.querySelector('.popup__btn_next');
const progress = document.getElementById('progress');
const popupSlot = document.querySelectorAll('.popup__slot');

let localData = {};

tabs.addEventListener('click', addClick);

function addClick(e) {
	let targetClick = e.target;

	if (targetClick.classList.contains('input')) {
		localData[targetClick.name] = targetClick.value;
		console.log(localData);
	}

}

// for (let i = 0; i < popupTab.length; i++) {
// 	popupTab[i++].classList.add('_active');
// }


$('.popup__btn_next').click(function (e) {
	let $current = $('.popup__tab._active');
	let $current2 = $('.popup__slot._active');
	let $current3 = $('.submit-btn');

	$current.removeClass('_active');
	$current.next('.popup__tab').addClass('_active');
	$current2.next('.popup__slot').addClass('_active');

	if ($('.popup__tab._active').index() === $('.popup__tab').length - 1) {
		$(this).hide();
		$current3.addClass('_send').prop("disabled", false);
	} else {
		$(this).siblings('.popup__btn_prev').show();
	}
});

$('.popup__btn_prev').click(function (e) {
	let $current = $('.popup__tab._active');
	let $current2 = $('.popup__slot._active');
	let $current3 = $('.submit-btn');

	$current.removeClass('_active');
	$current2.removeClass('_active');
	$current.prev('.popup__tab').addClass('_active');
	$current2.prev('.popup__slot').addClass('_active');

	if ($('.popup__tab._active').index() === 0) {
		$(this).hide();
	} else {
		$(this).siblings('.popup__btn_next').show();
		$current3.removeClass('_send').prop("disabled", true);
	}
})
