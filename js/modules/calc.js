function calc() {
//робимо калькулятор на сайті
const calculatingResult = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
  let sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
  let ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', '1.375');
}

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

function initLocalSetting(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute('id') === localStorage.getItem('sex')) {
      elem.classList.add(activeClass);
    }

    if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      elem.classList.add(activeClass);
    }
  });
}

initLocalSetting('#gender div', 'calculating__choose-item_active');
initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

calculating();
function getStaticInfo(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }
      console.log(ratio, sex);
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calculating();
    });
  });
}

getStaticInfo('#gender div', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInfo(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

    if(input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }

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
}
//module.exports = calc;
export default calc;