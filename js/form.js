const elementForm = document.querySelector('.ad-form');
const elementFormFieldset = elementForm.querySelectorAll('*');
const elementFilter = document.querySelector('.map__filters');
const elementFilterFieldset = elementFilter.querySelectorAll('*');

const setDisable = function (elements, status) {//устанавливает атрибут disable true | false указанной коллекции
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
  elementFilter.classList.remove('map__filters--disabled');

  setDisable(elementFormFieldset, false);
  setDisable(elementFilterFieldset, false);
};

export {enablePage, disablePage};


