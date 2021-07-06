const houseTypeElement = document.querySelector('#housing-type');
const housePriceElement = document.querySelector('#housing-price');
const houseRoomsElement = document.querySelector('#housing-rooms');
const houseGuestsElement = document.querySelector('#housing-guests');
const PRICE_MIN = 10000;
const PRICE_MAX = 50000;
// const houseFeauteresElement = document.querySelector('#housing-features');
// const wifiElement = document.querySelector('#filter-wifi');
// const dishwaterElement = document.querySelector('#filter-dishwasher');
// const parkingElement = document.querySelector('#filter-parking');
// const washerElement = document.querySelector('#filter-washer');
// const elevatorElement = document.querySelector('#filter-elevator');
// const conditionerElement = document.querySelector('#filter-conditioner');
const formElement = document.querySelector('.map__filters');

const filterType = function(element) {
  return houseTypeElement.value === 'any' || (element.offer.type === houseTypeElement.value);
};

const filterRooms = function(element) {
  return houseRoomsElement.value === 'any' || (element.offer.rooms === +houseRoomsElement.value);
};

const filterPrice = function(element) {
  if (housePriceElement.value === 'any' )  {
    return true;
  } else if (housePriceElement.value === 'low') {
    return (element.offer.price < PRICE_MIN);
  } else if (housePriceElement.value === 'high') {
    return (element.offer.price > PRICE_MAX);
  } else if (housePriceElement.value === 'middle') {
    return (element.offer.price > PRICE_MIN) && (element.offer.price < PRICE_MAX);
  }
};

const filterGuests = function(element) {
  return houseGuestsElement.value === 'any' || (element.offer.guests === +houseGuestsElement.value);
};

const onFilterChange = function(dataArrays)  {
  const arr = dataArrays
    .slice()
    .filter((element) => filterType(element))
    .filter((element) => filterRooms(element))
    .filter((element) => filterGuests(element))
    .filter((element) => filterPrice(element));

  // console.log('arr++', arr);


  // console.log(dataArrays,  dataArrays.slice(0, 10));
  return arr;//dataArrays.slice(0, 10);
};

const redraw = function(dataArrays) {
  // onFilterChange(dataArrays);
  const aaa = () => onFilterChange(dataArrays);
  formElement.addEventListener('change', aaa);
  // console.log('arr--', aaa());
  // return aaa;
};
export {onFilterChange, redraw};
