function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  console.log('click');
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  //попередні два рядки можна замінити на toggle
  //modalWindow.classList.toggle('show');

  //зробим щоб не можна було скролити вікно
  document.body.style.overflow = 'hidden';
  //якщо користувач сам відкрив модальне вікно
  //то видаляєм таймер, щоб вікно не показалось
  //йому автоматично
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
  
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  console.log('click');
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  //попередні два рядки можна замінити на toggle
  //modalWindow.classList.toggle('show');

  //відновлюєм можливість скролити
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
//показуєм модальне вікно при натисканні на кнопку

const openModalWindow = document.querySelectorAll(triggerSelector);
/* закоментуєм щоб зробити делегування подій
const closeModalWindow = document.querySelector('[data-modal-close]');
*/
const modalWindow = document.querySelector(modalSelector);

openModalWindow.forEach(item => {
  //ставимо стрілочну функцію щоб openmodal спрацювала не зразу, а тільки після кліка
  item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});

/* закоментуєм щоб зробити делегування подій
closeModalWindow.addEventListener('click', closeModal);
*/

//закриваєм модальне вікно якщо клікнули
//поза областею модального вікна
modalWindow.addEventListener('click', (e) => {
  //добавляєм e.target.getAttribute('data-modal-close') === ''
  //щоб закривалось модальне вікно навіть якщо воно має інший клас
  //але той самий data атрибут
  if (e.target === modalWindow || e.target.getAttribute('data-modal-close') === '') {
    closeModal(modalSelector);
  }
});

//закриваємо модальне вікно якщо натиснули
//кнопку ESC
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
    closeModal(modalSelector);
  }
});

//зробити щоб показувалось модальне вікно
//після того як користувач дойшов до footer
function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal, closeModal};