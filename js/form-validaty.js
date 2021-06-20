const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const inputUserTitle = document.querySelector('#title');
const inputUserPrice = document.querySelector('#price');
const inputFlat = document.querySelector('#type');
//const typesFlatArray = document.querySelector('#type').children;

//const inputAddress = document.querySelector('#address');


//валидация форм
//валидация поля заголовок сообщения


//трясет переданный элемент
const errorValidShakeAdd = function(classe) {
  classe.classList.add('validity-error');
  classe.addEventListener('animationend', () => {
    classe.classList.remove('validity-error');
  });
};

// true красит бордер переданного елемента красным, false - возвращает исходный цвет
const errorValidRedAdd = function(classe, value) {
  if (value) {  classe.classList.add('validity-error-red');}
  else {classe.classList.remove('validity-error-red');}
};

//общая функция проверки валидности всех полей формы
const validFieldForm = function() {

  //проверка валидности поля Title
  inputUserTitle.addEventListener('invalid', () => {
    if (inputUserTitle.validity.valueMissing) { inputUserTitle.setCustomValidity('Это обязательное поле для заполнения'); }
  });

  inputUserTitle.addEventListener('input', () => {
    const inputLength = inputUserTitle.value.length;

    if (inputLength < TITLE_MIN_LENGTH) {
      errorValidRedAdd(inputUserTitle, true);
      inputUserTitle.setCustomValidity(`Еще нужно ввести ${TITLE_MIN_LENGTH - inputLength} симв.`);}
    //     else if (inputLength >= TITLE_MIN_LENGTH && inputLength < TITLE_MAX_LENGTH) {
    //  //     errorValidRedAdd(inputUserTitle, false);
    //       inputUserTitle.setCustomValidity(`Доступно для ввода еще ${TITLE_MAX_LENGTH - inputLength} симв.`);}
    else if (inputLength > TITLE_MAX_LENGTH) {
      errorValidShakeAdd(inputUserTitle);
      errorValidRedAdd(inputUserTitle, true);
      inputUserTitle.setCustomValidity(`Удалите лишние ${inputLength - TITLE_MAX_LENGTH} симв.`);}
    else {
      inputUserTitle.setCustomValidity('');
      errorValidRedAdd(inputUserTitle, false);
    }
    inputUserTitle.reportValidity();
  });

  //валидация и синхронизация полей количества комнат и количества гостей
  const elementRoomNumber = document.querySelector('#room_number');
  const elementCapacity = document.querySelector('#capacity');
  const capacitysArray = elementCapacity.children;
  let room =  elementRoomNumber.value;

  //функция дисаблит элементы по номерам переданного массива
  const disableCapacity = function(array) {
    for (let i=0; i < capacitysArray.length; i++ ) {
      capacitysArray[i].disabled = false;
    }
    for (let i=0; i < array.length; i++) {
      capacitysArray[array[i]].disabled = true;

    }
  };

  //для дефолтного состояния, пока не трогали селектор

  if (room === '1') {
    disableCapacity([0, 1, 3]);
    room = elementCapacity[2].selected = true;}

  // обработка селектора комнат
  elementRoomNumber.addEventListener('change', () => {
    room = elementRoomNumber.value;
    if (room === '1') {
      disableCapacity([0, 1, 3]);
      room = elementCapacity[2].selected = true;
    }
    if (room === '2') {
      disableCapacity([0, 3]);
      room = elementCapacity[1].selected = true;
    }
    if (room === '3') {
      disableCapacity([3]);
      room = elementCapacity[0].selected = true;
    }
    if (room === '100') {
      disableCapacity([0, 1, 2]);
      room = elementCapacity[3].selected = true;
    }
  });

  //валидация поля цена
  const flatsMinPrice = {
    bungalow: 0,
    flat:1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };

  inputFlat.addEventListener('change', (event) => {

    inputUserPrice.min = flatsMinPrice[event.target.value];
    inputUserPrice.placeholder = flatsMinPrice[event.target.value] ;
  });


  //проверка валидности поля цена за ночь
  inputUserPrice.addEventListener('input', () => {

    if (+inputUserPrice.value >=  +inputUserPrice.min && +inputUserPrice.value < 1000001) {
      inputUserPrice.setCustomValidity('');
      errorValidRedAdd(inputUserPrice, false);
    }
    else {
      inputUserPrice.setCustomValidity(`Цена может быть от ${inputUserPrice.min} до 1000000 !`);
      errorValidShakeAdd(inputUserPrice);
      errorValidRedAdd(inputUserPrice, true);
    }
    inputUserPrice.reportValidity();
  });
  //------------------------------------------


};//конец общей проверки всех полей
export {validFieldForm}
