//import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
//import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
import {validateFieldForm, submitForm} from './form-validations.js'; //функции валидации форм;
import {showMap} from '../js/map.js'; //отрисовка карты;
import {getData} from '../js/api-server.js';
import {setPageDisable} from '../js/form.js';
// import {showAlert} from '../js/utils.js';

setPageDisable();

validateFieldForm();

getData((card) => showMap(card), () => {showMap();});

submitForm();


