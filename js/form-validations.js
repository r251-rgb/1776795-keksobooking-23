import {resetMap, LAT_CENTER, LNG_CENTER} from './map.js';
import {sendData} from './api-server.js';
import {setFilePreview, resetFileFlatPreview} from '../js/load-photo.js';
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const inputTitleElement = document.querySelector('#title');
const inputPriceElement = document.querySelector('#price');
const inputFlatElement = document.querySelector('#type');
const inputTimeInElement = document.querySelector('#timein');
const inputTimeOutElement = document.querySelector('#timeout');
const inputAddressElement = document.querySelector('#address');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const formElement = document.querySelector('.ad-form');
const capacitysArray = capacityElement.children;
const formResetButtonElement = document.querySelector('.ad-form__reset');
let room =  roomNumberElement.value;
const flatsMinPrice = {//справочник поля цена
  bungalow: 0,
  flat:1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const avatarElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
avatarElement.addEventListener('change', () => setFilePreview(avatarElement, avatarPreviewElement));

//валидация форм
//валидация поля заголовок сообщения
const shakeElementOnError = function(element) {//трясет переданный элемент
  element.classList.add('validation-error');
  element.addEventListener('animationend', () => {
    element.classList.remove('validation-error');
  });
};

// true красит бордер переданного елемента красным, false - возвращает исходный цвет
const paintRedErrorElement = function(element, value) {
  if (value) {
    element.classList.add('validation-error-red');
  }
  else {
    element.classList.remove('validation-error-red');
  }
};

const SetCapacityDisabled = function(array) {  //функция дисаблит элементы по номерам переданного массива
  for (let i=0; i < capacitysArray.length; i++ ) {
    capacitysArray[i].style.display = '';
  }
  for (let i=0; i < array.length; i++) {
    capacitysArray[array[i]].style.display = 'none';
  }
};

const setDefaultRoomSelector = function() {//для дефолтного состояния, пока не трогали селектор
  room = capacityElement[2].selected = true;
  SetCapacityDisabled([0, 1, 3]);
};

const validateFieldForm = function() {//общая функция проверки валидности всех полей формы

  inputTitleElement.addEventListener('invalid', () => { //проверка валидности поля Title
    if (inputTitleElement.validity.valueMissing) {
      inputTitleElement.setCustomValidity('Это обязательное поле для заполнения');
    }
  });

  inputTitleElement.addEventListener('input', () => {
    const inputLength = inputTitleElement.value.length;

    if (inputLength < TITLE_MIN_LENGTH) {
      paintRedErrorElement(inputTitleElement, true);
      inputTitleElement.setCustomValidity(`Еще нужно ввести ${TITLE_MIN_LENGTH - inputLength} симв.`);}
    else if (inputLength > TITLE_MAX_LENGTH) {
      shakeElementOnError(inputTitleElement);
      paintRedErrorElement(inputTitleElement, true);
      inputTitleElement.setCustomValidity(`Удалите лишние ${inputLength - TITLE_MAX_LENGTH} симв.`);}
    else {
      inputTitleElement.setCustomValidity('');
      paintRedErrorElement(inputTitleElement, false);
    }
    inputTitleElement.reportValidity();
  });

  //валидация и синхронизация полей количества комнат и количества гостей
  if (room === '1') { //для дефолтного состояния, пока не трогали селектор
    setDefaultRoomSelector();
  }

  roomNumberElement.addEventListener('change', () => { // обработка селектора комнат
    room = roomNumberElement.value;
    if (room === '1') {
      SetCapacityDisabled([0, 1, 3]);
      room = capacityElement[2].selected = true;
    }
    if (room === '2') {
      SetCapacityDisabled([0, 3]);
      room = capacityElement[1].selected = true;
    }
    if (room === '3') {
      SetCapacityDisabled([3]);
      room = capacityElement[0].selected = true;
    }
    if (room === '100') {
      SetCapacityDisabled([0, 1, 2]);
      room = capacityElement[3].selected = true;
    }
  });

  inputFlatElement.addEventListener('change', (event) => {

    inputPriceElement.min = flatsMinPrice[event.target.value];
    inputPriceElement.placeholder = flatsMinPrice[event.target.value] ;
  });

  inputPriceElement.addEventListener('input', () => {  //проверка валидности поля цена за ночь

    if (+inputPriceElement.value >=  +inputPriceElement.min && +inputPriceElement.value < 1000001) {
      inputPriceElement.setCustomValidity('');
      paintRedErrorElement(inputPriceElement, false);
    }
    else {
      inputPriceElement.setCustomValidity(`Цена может быть от ${inputPriceElement.min} до 1000000 !`);
      shakeElementOnError(inputPriceElement);
      paintRedErrorElement(inputPriceElement, true);
    }
    inputPriceElement.reportValidity();
  });

  inputTimeInElement.addEventListener('change', () => { //синхронизация полей заезда-выезда
    inputTimeOutElement.value = inputTimeInElement.value;
  });

  inputTimeOutElement.addEventListener('change', () => {
    inputTimeInElement.value = inputTimeOutElement.value;
  });
};//конец общей проверки всех полей

const resetForm = (evt) => { //очистка формы
  if (evt) {
    evt.preventDefault();
  }
  formElement.reset();
  inputAddressElement.value = `${LAT_CENTER}, ${LNG_CENTER}`;
  setDefaultRoomSelector();
  resetMap();
  setFilePreview(avatarElement, avatarPreviewElement); //очищает аватар
  resetFileFlatPreview();
};

formResetButtonElement.addEventListener('click', resetForm ); //обработка кнопки сброса формы

const submitForm = function (onSuccess, onError) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess,
      () => onError,
      new FormData(evt.target));
  });
};

export {validateFieldForm, setDefaultRoomSelector, submitForm, resetForm};

