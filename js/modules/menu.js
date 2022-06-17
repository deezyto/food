import {getRequest} from '../services/services';

function menu() {
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
  
  getRequest('http://localhost:3000/menu')
  .then(data => {
    //деструктуризуєм обєкти
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}

export default menu;