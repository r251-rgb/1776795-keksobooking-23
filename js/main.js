import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек


//generateCardElement(createCardArray);

//первый элемент массива для отрисовки
const tmp = createCardArray[0];

document.querySelector('#map-canvas').appendChild(generateCardElement(tmp));
