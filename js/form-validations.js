import {resetMap, showMap, getDefaultLatLng} from './map.js';
import {sendData, getData} from './api-server.js';
import {setFilePreview, setFileFlatPreview, resetFileFlatPreview} from '../js/load-photo.js';
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
const avatarElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const imageElement = document.querySelector('#images');
const houseFeaturesElement = document.querySelector('.map__filters');
const FlatsMinPrice = {//справочник поля цена
  bungalow: 0,
  flat:1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
let rooms =  roomNumberElement.value;

//валидация форм
//валидация поля заголовок сообщения
const shakeElementOnError = (element) => {//трясет переданный элемент
  element.classList.add('validation-error');
  element.addEventListener('animationend', () => {
    element.classList.remove('validation-error');
  });
};

// true красит бордер переданного елемента красным, false - возвращает исходный цвет
const setRedBorderErrorElement = (element, value) => {
  if (value) {
    element.classList.add('validation-error-red');
  }
  else {
    element.classList.remove('validation-error-red');
  }
};

const setCapacitysDisabled = (array) => {  //функция дисаблит элементы по номерам переданного массива
  for (let i=0; i < capacitysArray.length; i++ ) {
    capacitysArray[i].style.display = '';
  }
  for (let i=0; i < array.length; i++) {
    capacitysArray[array[i]].style.display = 'none';
  }
};

const setDefaultRoomSelector = () => {//для дефолтного состояния, пока не трогали селектор
  rooms = capacityElement[2].selected = true;
  setCapacitysDisabled([0, 1, 3]);
};

const validateFieldForm = () => {//общая функция проверки валидности всех полей формы

  inputTitleElement.addEventListener('invalid', () => { //проверка валидности поля Title
    if (inputTitleElement.validity.valueMissing) {
      inputTitleElement.setCustomValidity('Это обязательное поле для заполнения');
    }
  });

  inputTitleElement.addEventListener('input', () => {
    const inputLength = inputTitleElement.value.length;
    if (inputLength < TITLE_MIN_LENGTH) {
      setRedBorderErrorElement(inputTitleElement, true);
      inputTitleElement.setCustomValidity(`Еще нужно ввести ${TITLE_MIN_LENGTH - inputLength} симв.`);}
    else if (inputLength > TITLE_MAX_LENGTH) {
      shakeElementOnError(inputTitleElement);
      setRedBorderErrorElement(inputTitleElement, true);
      inputTitleElement.setCustomValidity(`Удалите лишние ${inputLength - TITLE_MAX_LENGTH} симв.`);}
    else {
      inputTitleElement.setCustomValidity('');
      setRedBorderErrorElement(inputTitleElement, false);
    }
    inputTitleElement.reportValidity();
  });

  inputPriceElement.addEventListener('input', () => {  //проверка валидности поля цена за ночь
    if (+inputPriceElement.value >=  +inputPriceElement.min && +inputPriceElement.value < 1000001) {
      inputPriceElement.setCustomValidity('');
      setRedBorderErrorElement(inputPriceElement, false);
    }
    else if (+inputPriceElement.value <  +inputPriceElement.min)
    {inputPriceElement.setCustomValidity(`Цена может быть не меньше ${inputPriceElement.min}`);
      setRedBorderErrorElement(inputPriceElement, true);
    } else {
      inputPriceElement.setCustomValidity('Цена может быть не более 1000000 !');
      shakeElementOnError(inputPriceElement);
      setRedBorderErrorElement(inputPriceElement, true);
    }
    inputPriceElement.reportValidity();
  });

  //валидация и синхронизация полей количества комнат и количества гостей
  if (rooms === '1') { //для дефолтного состояния, пока не трогали селектор
    setDefaultRoomSelector();
  }

  formElement.addEventListener('change', (evt) => {// делегирование обработки событий на form
    switch (evt.target) {
      case inputTimeInElement: //синхронизация полей заезда-выезда
        inputTimeOutElement.value = inputTimeInElement.value;
        break;

      case inputTimeOutElement: //синхронизация полей заезда-выезда
        inputTimeInElement.value = inputTimeOutElement.value;
        break;

      case inputFlatElement: // установка минимальной цены
        inputPriceElement.min = FlatsMinPrice[evt.target.value];
        inputPriceElement.placeholder = FlatsMinPrice[evt.target.value] ;
        break;

      case roomNumberElement: // обработка селектора комнат
        rooms = roomNumberElement.value;
        if (rooms === '1') {
          setCapacitysDisabled([0, 1, 3]);
          rooms = capacityElement[2].selected = true;
        }
        if (rooms === '2') {
          setCapacitysDisabled([0, 3]);
          rooms = capacityElement[1].selected = true;
        }
        if (rooms === '3') {
          setCapacitysDisabled([3]);
          rooms = capacityElement[0].selected = true;
        }
        if (rooms === '100') {
          setCapacitysDisabled([0, 1, 2]);
          rooms = capacityElement[3].selected = true;
        }
        break;

      case avatarElement: // обработчик загрузки аватара
        setFilePreview(avatarElement, avatarPreviewElement);
        break;

      case imageElement: // обработчик загрузки фото квартиры
        setFileFlatPreview(imageElement);
        break;
    }
  });
};//конец общей проверки всех полей

const resetForm = (evt) => { //очистка формы
  if (evt) {
    evt.preventDefault();
  }
  formElement.reset();
  const getLatLng = getDefaultLatLng();
  inputAddressElement.value = `${getLatLng[0]}, ${getLatLng[1]}`;

  setDefaultRoomSelector();
  resetMap();
  setFilePreview(avatarElement, avatarPreviewElement); //очищает аватар
  resetFileFlatPreview();
  houseFeaturesElement.reset();
  getData((card) => showMap(card), () => {showMap();});
};

const submitForm = (onSuccess, onError) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess,
      () => onError,
      new FormData(evt.target));
  });
};

formResetButtonElement.addEventListener('click', resetForm ); //обработка кнопки сброса формы

formElement.addEventListener('invalid', (evt) => { // припопытке отправки формы подсвечивает все невалидные поля
  shakeElementOnError(evt.target);
  setRedBorderErrorElement(evt.target, true);
  setTimeout(() => {setRedBorderErrorElement(evt.target, false);
  }, 500);
}, true);

export {validateFieldForm, setDefaultRoomSelector, submitForm, resetForm};
