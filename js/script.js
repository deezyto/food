require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import menu from './modules/menu';
import timer from './modules/timer';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  //зробити щоб показувалось модальне вікно
  //через деякий час
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  menu();
  timer('.timer', '2022-07-10');
  modal('[data-modal]', '.modal', modalTimerId);
  forms('form', modalTimerId);
  slider({
    container : '.offer__slider',
    curentSlide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    allCounter: '#all',
    currentCounter: '#current',
    slidesWrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  calc();
});
