


const PriceRestrictions = {
  LOWER: 10000,
  UPPER: 50000,
};

const filters = document.querySelector('.map__filters');
const filtersSelect = filters.querySelectorAll('select');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');
const housingFeatures = filters.querySelector('#housing-features');

const deactivateFilters = function () {
  filters.reset();
  window.util.setDisabled(filtersSelect);
  housingFeatures.disabled = true;
};

deactivateFilters();

const activateFilters = function () {
  window.util.removeDisabled(filtersSelect);
  housingFeatures.disabled = false;
};

const filterType = function (pin) {
  return housingType.value === 'any' || pin.offer.type === housingType.value;
};

const filterPrice = function (pin) {
  if (housingPrice.value === 'any') {
    return true;
  } else if (housingPrice.value === 'low') {
    return pin.offer.price < PriceRestrictions.LOWER;
  } else if (housingPrice.value === 'middle') {
    return pin.offer.price >= PriceRestrictions.LOWER && pin.offer.price <= PriceRestrictions.UPPER;
  } else if (housingPrice.value === 'high') {
    return pin.offer.price > PriceRestrictions.UPPER;
  }
  return true;
};

const filterRooms = function (pin) {
  return housingRooms.value === 'any' || pin.offer.rooms === parseInt(housingRooms.value, 10);
};

const filterGuests = function (pin) {
  return housingGuests.value === 'any' || pin.offer.guests === parseInt(housingGuests.value, 10);
};

const filterFeauters = function (pin) {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');
  return [].every.call(checkedFeatures, (element) => pin.offer.features.includes(element.value));
};

const updatePins = function () {
  const pinsCopy = window.data.pins.slice();
  const filterPins = pinsCopy.filter((pin) => filterType(pin) && filterPrice(pin) && filterRooms(pin) && filterGuests(pin) && filterFeauters(pin));
  window.pin.render(filterPins);
};

const onFilterChange = window.debounce(() => {
  window.pin.remove();
  window.card.remove();
  updatePins();
});

filters.addEventListener('change', onFilterChange);

window.filter = {
  activate: activateFilters,
  deactivate: deactivateFilters,
};

