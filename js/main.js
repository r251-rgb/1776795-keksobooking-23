import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
import {enablePage, disablePage} from '../js/form.js'; //функции активации деактивации страницы;
import {validFieldForm} from '../js/form-validaty.js'; //функции активации деактивации страницы;

//generateCardElement(createCardArray);

//первый элемент массива для отрисовки
const tmp = createCardArray[0];

document.querySelector('#map-canvas').appendChild(generateCardElement(tmp));
disablePage();
enablePage();


validFieldForm();
