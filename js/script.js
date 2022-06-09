'use strict';

window.addEventListener('DOMContentLoaded', () => {
//потрібно зробити щоб при кліку на меню міналась картинка
//текст і посилання меню було активне

//вкладки на які будем натискати
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
  tabsContent.forEach(item => {
    //item.style.display = 'none';
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
  });

  tabs.forEach(item => {
    item.classList.remove('tabheader__item_active');
  });
}

function showTabContent(i = 0) {
  //tabsContent[i].style.display = 'block';
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader__item_active');

}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.classList.contains('tabheader__item')) {
    tabs.forEach((item, i) => {
      if (target === item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

//потрібно створити таймер на сайті
const endtime = '2022-06-10';

function getTimeRemaining(endtime) {
  //зробимо щоб показувались нулі, якщо дата минула
  let days, hours, minutes, seconds;

  const t = Date.parse(endtime) - Date.parse(new Date());

  if (t <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor(t / (1000 * 60 * 60 * 24));
    hours = Math.floor((t / (1000 * 60 * 60) % 24));
    minutes = Math.floor((t / 1000 / 60) % 60);
    seconds = Math.floor((t / 1000) % 60);
  }
  
  return {
    all: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };

}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock(selector, endtime) {
  const timer = document.querySelector(selector);
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');
  const timeInterval = setInterval(updateClock, 1000);

  //викликаєм спочатку щоб не було мигання попередньої дати
  updateClock();

  function updateClock() {

    const t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);
    
    if (t.all <= 0) {
      clearInterval(timeInterval);
    }

  }

}

setClock('.timer', endtime);

//показуєм модальне вікно при натисканні на кнопку

const openModalWindow = document.querySelectorAll('[data-modal]');
/* закоментуєм щоб зробити делегування подій
const closeModalWindow = document.querySelector('[data-modal-close]');
*/
const modalWindow = document.querySelector('.modal');

openModalWindow.forEach(item => {
  item.addEventListener('click', openModal);
});

function openModal() {
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
  clearInterval(modalTimerId);
}

function closeModal() {
  console.log('click');
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  //попередні два рядки можна замінити на toggle
  //modalWindow.classList.toggle('show');

  //відновлюєм можливість скролити
  document.body.style.overflow = '';
}

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
    closeModal();
  }
});

//закриваємо модальне вікно якщо натиснули
//кнопку ESC
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
    closeModal();
  }
});

//зробити щоб показувалось модальне вікно
//через деякий час
const modalTimerId = setTimeout(openModal, 50000);

//зробити щоб показувалось модальне вікно
//після того як користувач дойшов до footer
function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);

//створюєм карточки в меню
class MenuCards {
  constructor(image, imageAlt, title, description, price, parentSelector, ...classe) {
    this.image = image;
    this.imageAlt = imageAlt;
    this.title = title;
    this.description = description;
    this.price = price;
    this.transfer = 27;
    this.classe = classe.length === 0 ? ['menu__item'] : classe;
    this.parentSelector = document.querySelector(parentSelector);
    this.changeTOUAH();
  }

  changeTOUAH() {
    this.price *= this.transfer;
  }

  render() {
    const element = document.createElement('div');

    this.classe.forEach(className => {
      element.classList.add(className);
    });

    element.insertAdjacentHTML('afterbegin', `
    <img src=${this.image} alt=${this.imageAlt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.description}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
    <div class="menu__item-cost">Цена:</div>
    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
    `);

    this.parentSelector.append(element);

    console.log(this.container);
  }

}

new MenuCards(
  "img/tabs/vegy.jpg",
  'vegy',
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  35,
  '.menu__field .container'
).render();

new MenuCards(
  "img/tabs/elite.jpg",
  'elite',
  'Меню "Премиум"', 
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  27,
  '.menu__field .container',
  'menu__item'
).render();

new MenuCards(
  "img/tabs/post.jpg", 
  "post", 
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  23,
  '.menu__field .container',
  'menu__item'
).render();

//створюєм функцію відправки даних на сервер
//за допомогою JSON
const forms = document.querySelectorAll('form');
console.log(forms, 'forms');

const message = {
  loading: 'img/form/spinner.svg',
  success: 'Дякую, скоро ми Вам зателефонуєм!',
  failure: 'Щось пішло не так...'
};

//перебираєм всі форми на сайті
//щоб приймати дані зі всіх форм
forms.forEach(item => {
  postData(item);
});

function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMassage = document.createElement('img');
    
    statusMassage.src = message.loading;
    //statusMassage.textContent = message.loading;
    statusMassage.style.cssText =`
      display: block;
      margin: 0 auto;
    `;

    //form.append(statusMassage);
    //ставимо картинку завантаження після форми
    form.insertAdjacentElement('afterend', statusMassage);

    const request = new XMLHttpRequest();

    request.open('POST', 'server.php');

    request.setRequestHeader('Content-type', 'application/json');
    //формат відправки даних formData
    const formData = new FormData(form);

    //робимо з формата formData формат обєкта
    const object = {};

    formData.forEach((value, key) => {
      object[key] = value;
    });

    //конвертуєм готовий обєкт в JSON
    const json = JSON.stringify(object);

    request.send(json);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log('OK');
        showThanksModal(message.success);
        //очищаєм форму після відправки
        form.reset();

        //видаляєм повідомлення про відправку даних
        statusMassage.remove();

      } else {
        showThanksModal(message.failure);
      }
    });
  });
}

//робимо красиве оповіщення користувача
function showThanksModal(message) {
  //отримуєм блок модального вікна
  const prevModalDialog = document.querySelector('.modal__dialog');
  console.log(prevModalDialog);
  //закриваєм блок модального вікна
  prevModalDialog.classList.add('hide');
  openModal();
  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML = `
  <div class="modal__content">
  <div class="modal__close" data-modal-close>x</div>
  <div class="modal__title">${message}</div>
  </div>
  `;

  document.querySelector('.modal').append(thanksModal);

  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
  }, 5000);

}
});
