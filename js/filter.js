const houseTypeElement = document.querySelector('#housing-type');
const housePriceElement = document.querySelector('#housing-price');
const houseRoomsElement = document.querySelector('#housing-rooms');
const houseGuestsElement = document.querySelector('#housing-guests');
const houseFeauteresElement = document.querySelector('#housing-features');
const PRICE_MIN = 10000;
const PRICE_MAX = 50000;

const filterType = (element) => houseTypeElement.value === 'any' || (element.offer.type === houseTypeElement.value);

const filterRooms = (element) => houseRoomsElement.value === 'any' || (element.offer.rooms === +houseRoomsElement.value);

const filterPrice = (element) => {
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

const filterGuests = (element) => houseGuestsElement.value === 'any' || (element.offer.guests === +houseGuestsElement.value);

const filterFeauters = (element) => {
  const checkedFeatures = houseFeauteresElement.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures.length === 0) { // если не выбран ни один селектор
    return true;
  } else if (element.offer.features === undefined) { // если у карточки вообще нет фич
    return false;
  }
  return [].every.call(checkedFeatures, (el) => element.offer.features.includes(el.value));
};

const onFilterChange = (dataArrays) => {
  const arr = dataArrays
    .slice()
    .filter((element) => filterType(element))
    .filter((element) => filterRooms(element))
    .filter((element) => filterGuests(element))
    .filter((element) => filterPrice(element))
    .filter((element) => filterFeauters(element));
  return arr.slice(0, 10);
};

export {onFilterChange};
