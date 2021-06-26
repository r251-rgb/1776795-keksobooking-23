import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
import {enablePage, disablePage} from '../js/form.js'; //функции активации деактивации страницы;
import {validFieldForm} from '../js/form-validaty.js'; //функции валидации форм;
import {showMap} from '../js/map.js'; //отрисовка карты;


// generateCardElement(createCardArray);
// console.log(generateCardElement);


//первый элемент массива для отрисовки
// const tmp = createCardArray[0];
// console.log(tmp);

// document.querySelector('#map-canvas').appendChild(generateCardElement(tmp));
// disablePage();

validFieldForm();

showMap();
