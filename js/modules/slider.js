function slider({container, curentSlide, nextArrow, prevArrow, allCounter, currentCounter, slidesWrapper, field}) {
//створюєм слайдер, моя версія
//standart or carrousel
const SLIDER_TYPE = 'carrousel';

const offerSlide = document.querySelector(container); //container
const wrapper = document.querySelector(slidesWrapper); //slidesWrapper
const slide = wrapper.querySelector(curentSlide); //curentSlide
const slides = document.querySelectorAll('.offer__slide');
const prevSlide = document.querySelector(prevArrow); //prevArrow
const nextSlide = document.querySelector(nextArrow); //nextArrow
const currentSlide = document.querySelector(currentCounter); //currentCounter
const allSlide = document.querySelector(allCounter); //allCounter
const slidesField = document.querySelector(field); //field
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
}

export default slider;