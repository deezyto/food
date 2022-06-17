import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
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
const forms = document.querySelectorAll(formSelector);
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
  openModal('.modal', modalTimerId);
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
    closeModal('.modal');
  }, 5000);

}

//підключаємся до бази даних json server
fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));

}

export default forms;