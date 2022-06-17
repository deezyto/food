
window.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs');
  const menu = require('./modules/menu');
  const timer = require('./modules/timer');
  const modal = require('./modules/modal');
  const forms = require('./modules/forms');
  const slider = require('./modules/slider');
  const calc = require('./modules/calc');

  tabs();
  menu();
  timer();
  modal();
  forms();
  slider();
  calc();
});
