const FormElement = document.querySelector('.ad-form');
const FormFieldsetElement = FormElement.querySelectorAll('*');
const filterElement = document.querySelector('.map__filters');
const filterFieldsetElement = filterElement.querySelectorAll('*');

//устанавливает атрибут disable true | false указанному массиву (на коллекциях не работает)
const setElementDisable = function (elements, status) {
  elements.forEach((item) => {item.disabled = status;});
};

const setPageDisable = function() {//блокирует всю страницу
  setElementDisable(FormFieldsetElement, true);
  setElementDisable(filterFieldsetElement, true);
  FormElement.classList.add('ad-form--disabled');
  filterElement.classList.add('map__filters--disabled');
};


const setPageEnable = function() {
  FormElement.classList.remove('ad-form--disabled');
  setElementDisable(FormFieldsetElement, false);
};

const setFiltersEnable = function () {
  filterElement.classList.remove('map__filters--disabled');
  setElementDisable(filterFieldsetElement, false);
};

export {setPageEnable, setFiltersEnable, setPageDisable};
