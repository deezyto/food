'use strict';

//standart or carrousel
const SLIDER_TYPE = 'carrousel';
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

const getRequest = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};


getRequest('http://localhost:3000/menu')
.then(data => {
  //деструктуризуєм обєкти
  data.forEach(({img, altimg, title, descr, price}) => {
    new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
  });
});

//створюєм слайдер, моя версія
const offerSlide = document.querySelector('.offer__slider');
const wrapper = document.querySelector('.offer__slider-wrapper');
const slide = wrapper.querySelector('.offer__slide');
const slides = document.querySelectorAll('.offer__slide');
const prevSlide = document.querySelector('.offer__slider-prev');
const nextSlide = document.querySelector('.offer__slider-next');
const currentSlide = document.querySelector('#current');
const allSlide = document.querySelector('#all');
const slidesField = document.querySelector('.offer__slider-inner');
const width = window.getComputedStyle(wrapper).width;
const carousel = document.querySelector('.carousel-indicators');

let i = 1;
let offset = 0;

//стандартний слайдер
function prevOrNextSlide() {

nextSlide.addEventListener('click', (e) => {
  //користувач натиснув next + 1

  if (i === +allSlide.textContent) {
    i = 1;
  } else {
    i++; 
  }

  console.log(+allSlide.textContent);
  hideSliderCards();
  showSliderCards(i);
  console.log(i, 'next');
  console.log(typeof(i), 'next');
});


prevSlide.addEventListener('click', (e) => {
  //користувач натиснув prev -1
  if (i === 1) {
    i = +allSlide.textContent;
  } else {
    i--;
  }
  
  hideSliderCards();
  showSliderCards(i);

  console.log(i, 'prev');
  console.log(typeof(i), 'prev');
});

}

function hideSliderCards() {
  slide.innerHTML = '';
}

function showSliderCards(number=1) {
  getRequest('http://localhost:3000/slider')
  .then(data => {
    if (+allSlide.textContent < 10) {
      allSlide.textContent = `0${data.length}`;
      currentSlide.textContent = `0${number}`;
    } else {
      allSlide.textContent = data.length;
      currentSlide.textContent = number;
    }
    slide.insertAdjacentHTML('afterbegin', `
    <img class="fade" src=${data[number-1].img} alt=${data[number-1].altimg}>
    `);
  });
}

//слайдер по типу каруселі

function deletePx(str) {
  return +str.replace(/px/, '');
}

function slider() {
  currentSlide.textContent = '01';
  allSlide.textContent = '04';
  slidesField.innerHTML = `
  <div class="offer__slide">
  <img class="fade" src="img/slider/pepper.jpg" alt="pepper">
  </div>
  <div class="offer__slide">
  <img class="fade" src="img/slider/food-12.jpg" alt="food">
  </div>
  <div class="offer__slide">
  <img class="fade" src="img/slider/olive-oil.jpg" alt="oil">
  </div>
  <div class="offer__slide">
  <img class="fade" src="img/slider/paprika.jpg" alt="paprika">
  </div>
  `;

  //щоб точки були правильно розміщені добавим позицію relative
  offerSlide.style.position = 'relative';
  //створим новий єлемент в середині якого будуть розміщуватись точки
  const element = document.createElement('div');
  element.classList.add('carousel-indicators');
  offerSlide.append(element);

  //поміщуєм на сторінку стільки точок скільки є картинок
  for (let i = +allSlide.textContent; i > 0; i--) {
    document.querySelector('.carousel-indicators').insertAdjacentHTML('afterbegin', `
    <div class="dot"></div>`);
  }

  //робимо обробник подій
  const dot = document.querySelectorAll('.dot');

  //видаляємо клас active
  function removeActiveDot() {
    dot.forEach(item => {
      item.classList.remove('active');
    });
  }

  //добавляємо клас active
  //приймаючи індекс єлемента 
  function addActiveDot(i=0) {
    dot[i].classList.add('active');
  }

  addActiveDot();

  //назначаєм обробник подій всім точкам
  dot.forEach((item, index) => {
    item.addEventListener('click', () => {
      //кожен слайд має ширину 650px
      //якщо помножити ширину на індекс
      //точки отримаєм відповідний width
      //потрібного слайда
      //перед тим методом slice видаляєм px
      //slidesField.style.transform = `translateX(-${slide.style.width.slice(0, width.length - 2) * index}px)`;
      slidesField.style.transform = `translateX(-${deletePx(slide.style.width) * index}px)`;
      removeActiveDot();
      addActiveDot(index);
      if (+allSlide.textContent < 10) {
        currentSlide.textContent = `0${index+1}`;
      } else {
        currentSlide.textContent = index+1;
      }
    });
  });

  if (+allSlide.textContent < 10) {
    allSlide.textContent = `0${+allSlide.textContent}`;
    currentSlide.textContent = `0${i}`;
  } else {
    allSlide.textContent = +allSlide.textContent;
    currentSlide.textContent = i;
  }

  slidesField.style.width = 100 * +allSlide.textContent + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  wrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  nextSlide.addEventListener('click', () => {
    if (offset === deletePx(width) * (+allSlide.textContent -1)) {
      offset = 0;
    } else {
      offset += deletePx(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (i === +allSlide.textContent) {
      i = 1;
    } else {
      i++;
    }

    if (+allSlide.textContent < 10) {
      currentSlide.textContent = `0${i}`;
    } else {
      currentSlide.textContent = i;
    }

    //передаєм в функцію індекс
    //єлемента щоб добавити класс
    //active відповідній точці
    removeActiveDot();
    addActiveDot(i-1);

  });

  prevSlide.addEventListener('click', () => {
    if (offset === 0) {
      offset = deletePx(width) * (+allSlide.textContent -1);
    } else {
      offset -= deletePx(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (i === 1) {
      i = +allSlide.textContent;
    } else {
      i--;
    }

    if (+allSlide.textContent < 10) {
      currentSlide.textContent = `0${i}`;
    } else {
      currentSlide.textContent = i;
    }
    removeActiveDot();
    addActiveDot(i-1);
  });

}

if (SLIDER_TYPE === 'standart') {
  prevOrNextSlide();
  showSliderCards();
} else {
  slider();
}

//інший спосіб вивести обєкти на сторінці
/*
getRequest('http://localhost:3000/menu')
.then(data => createCard(data));

function createCard(data) {
  data.forEach(({img, altimg, title, descr, price}) => {
    const element = document.createElement('div');
    element.classList.add('menu__item');

    element.innerHTML = `
    <img src=${img} alt=${altimg}>
    <h3 class="menu__item-subtitle">${title}</h3>
    <div class="menu__item-descr">${descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
    <div class="menu__item-cost">Цена:</div>
    <div class="menu__item-total"><span>${price}</span> грн/день</div>
    </div>
    `;

    document.querySelector('.menu .container').append(element);
  });
}

//виводим обєкти на сторінці за допомогою axios
axios.get('http://localhost:3000/menu')
.then(data => {
  data.data.forEach(({img, altimg, title, descr, price}) => {
    new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
  });
});

*/

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
  bindPostData(item);
});

const postData = async (url, data) => {
  //ставимо await до початка метода fetch()
  //оскільки потрібно дочекатись отримання promise
  const result = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
    });
  
  //ставимо await щоб вернути promise
  //коли він буде готовий
  return await result.json();
};

function bindPostData(form) {
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

    //request.setRequestHeader('Content-type', 'application/json');
    //формат відправки даних formData
    const formData = new FormData(form);
    
    //робимо з формата formData формат обєкта
    /*
    const object = {};

    formData.forEach((value, key) => {
      object[key] = value;
    });
    */
    //інший метод зробити з формата formData формат обєкта

    //перетворюєм методом entries() formData в масив масивів
    //перетворюєм масив масивів в звичайний обєкт
    //перетворюєм обєкт в формат json
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
    //трансоформація даних вже не потрібна
    //.then(data => data.text())
    .then(data => {
      console.log(data);
      showThanksModal(message.success);
      //видаляєм повідомлення про відправку даних
      statusMassage.remove();
    }).catch(() => {
      showThanksModal(message.failure);
    }).finally(() => {
      //очищаєм форму після відправки
      form.reset();
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

//підключаємся до бази даних json server
fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));

//робимо калькулятор на сайті

const calculatingResult = document.querySelector('.calculating__result span');
let sex = 'female', 
    height, weight, age, 
    ratio = '1.375';

function calculating() {
  if (!sex || !height || !weight || !age || !ratio) {
    calculatingResult.textContent = '0';
    return;
  }
  if (sex === 'female') {
    calculatingResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    calculatingResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

calculating();
function getStaticInfo(parentSelector, activeClass) {
  const elements = document.querySelectorAll(`${parentSelector} div`);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
      } else {
        sex = e.target.getAttribute('id');
      }
      console.log(ratio, sex);
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calculating();
    });
  });
  /* варіант з делегуванням подій
  document.querySelector(parentSelector).addEventListener('click', (e) => {
    if (e.target.getAttribute('data-ratio')) {
      ratio = +e.target.getAttribute('data-ratio');
    } else {
      sex = e.target.getAttribute('id');
    }
    console.log(ratio, sex);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);
    });

    e.target.classList.add(activeClass);

    calculating();
  });
  */
}

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInfo(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {
    switch(input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
    }
    calculating();
  });
}

getDynamicInfo('#height');
getDynamicInfo('#weight');
getDynamicInfo('#age');
});
