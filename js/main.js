//import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
//import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
import {validFieldForm} from '../js/form-validaty.js'; //функции валидации форм;
import {showMap} from '../js/map.js'; //отрисовка карты;
import {getData} from '../js/api-server.js';
import {disablePage, enableFilters, userFormSubmit} from '../js/form.js';
// import {showAlert} from '../js/utils.js';

disablePage();
validFieldForm();

getData((card) => console.log('ddddd'), (error) => {
  console.log('sssssssss');
  showMap();
});


// (card) => {showMap(card);}
// getData((card, error) => {
//   showMap(card), showMap();},
// ); //получает данные, отрисовывает карту и маркеры

enableFilters();      //разрешает разблокировку фильтров

userFormSubmit();


// onErrorModal();
// onSuccessModal();
