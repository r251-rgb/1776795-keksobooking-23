import {sendData} from '../js/api-server.js';

const elementForm = document.querySelector('.ad-form');
const elementFormFieldset = elementForm.querySelectorAll('*');
const elementFilter = document.querySelector('.map__filters');
const elementFilterFieldset = elementFilter.querySelectorAll('*');

//устанавливает атрибут disable true | false указанному массиву (на коллекциях не работает)
const setDisable = function (elements, status) {
  elements.forEach((item) => {item.disabled = status;});
};

//блокирует всю страницу
const disablePage = function() {
  setDisable(elementFormFieldset, true);
  setDisable(elementFilterFieldset, true);

  elementForm.classList.add('ad-form--disabled');
  elementFilter.classList.add('map__filters--disabled');
};


const enablePage = function() {
  elementForm.classList.remove('ad-form--disabled');


  setDisable(elementFormFieldset, false);

};

const enableFilters = function () {
  elementFilter.classList.remove('map__filters--disabled');
  setDisable(elementFilterFieldset, false);
};

const userFormSubmit = function (onSuccess, onError) {
  elementForm.addEventListener('submit', (evt) => {
    // evt.preventDefault();
    sendData(
      onSuccess,
      onError,
      new FormData(evt.target));
  });
};

export {enablePage, enableFilters, disablePage, userFormSubmit}; //
