const formElement = document.querySelector('.ad-form');
const formFieldsetElement = formElement.querySelectorAll('*');
const filterElement = document.querySelector('.map__filters');
const filterFieldsetElement = filterElement.querySelectorAll('*');

//устанавливает атрибут disable true | false указанному массиву (на коллекциях не работает)
const setElementDisable = (elements, status) => {
  elements.forEach((item) => {item.disabled = status;});
};

const setPageDisable = () => {//блокирует всю страницу
  setElementDisable(formFieldsetElement, true);
  setElementDisable(filterFieldsetElement, true);
  formElement.classList.add('ad-form--disabled');
  filterElement.classList.add('map__filters--disabled');
};

const setPageEnable = () => {
  formElement.classList.remove('ad-form--disabled');
  setElementDisable(formFieldsetElement, false);
};

const setFiltersEnable = () => {
  filterElement.classList.remove('map__filters--disabled');
  setElementDisable(filterFieldsetElement, false);
};

export {setPageEnable, setFiltersEnable, setPageDisable};
