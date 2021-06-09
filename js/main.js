import {NUMBER_GENERATE_CARD} from '../js/setup.js'; //количество карточек для генерации
import {createCardOffer} from '../js/create-card.js'; //функция генерации карточек

const createCardArray = new Array(NUMBER_GENERATE_CARD).fill(null).map(() => createCardOffer() );

//console.log(createCardArray);
createCardArray.find();
