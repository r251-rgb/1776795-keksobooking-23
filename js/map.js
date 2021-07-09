import {setPageEnable, setFiltersEnable} from '../js/form.js';
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
import {onFilterChange} from '../js/filter.js'; //функция генерации карточек
import {getData} from '../js/api-server.js';
const inputAddressElement = document.querySelector('#address');
const resetButtonElement = document.querySelector('.reset__map');
const formElement = document.querySelector('.map__filters');
const LAT_CENTER =   (35.680174645).toFixed(5);
const LNG_CENTER = (139.7539934567).toFixed(5);
let lat = +LAT_CENTER;
let lng = +LNG_CENTER;
inputAddressElement.value = `${lat}, ${lng}`;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// /* global L:readonly */
const map = L.map('map-canvas')
  .setView({lat, lng}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
  .addTo(map)

  .on('load', () => {
    setPageEnable();
  });

//главный маркер
const setMainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const setMainPin = L.marker(
  {lat, lng},
  {
    draggable: true,
    icon: setMainIcon,
  });

setMainPin
  .addTo(map);//добавляет на карту главный пин

setMainPin.on('moveend', (evt) => {//после перемещения пина передает координаты в поле адреса
  inputAddressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;

});
const markerGroup = L.layerGroup().addTo(map);  //создание слоя layerGroup для простых маркеров

const placeMarker = function(filteredArray) {  // функция рисует маркеры по полученному массиву
  markerGroup.clearLayers(); // сначала очищает слой
  filteredArray.forEach((card) => {
    lat =  card.location.lat;
    lng = card.location.lng;
    const othersIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const othersPin = L.marker(
      {lat, lng},
      {
        draggable: false,
        icon: othersIcon,
      });
    othersPin
      .addTo(markerGroup)
      .bindPopup(() => generateCardElement(card)); //замыкание
  });
};

const redrawMap = function (loadedCardData) { // функция пересчета карты по фильтрам
  const getFilteredArray = onFilterChange(loadedCardData); // запрос филтрации
  placeMarker(getFilteredArray); // рисуем новые маркеры
};



const showMap = function(loadedCardData) { //общая функция отрисовку карты
  if (!loadedCardData) {loadedCardData =  getData();} // неудачная попытка грузить данные после ресета формы
  formElement.addEventListener('change', debounce(() => (redrawMap(loadedCardData))));
  if (loadedCardData) {
    placeMarker(loadedCardData.slice(0,10)); // отрисовка изначального набора маркеров
    setFiltersEnable();
  }
};



const resetMap = () => {//очистка карты
  lat = LAT_CENTER;
  lng = LNG_CENTER;
  map.setView({lat, lng}, 12);
  setMainPin.setLatLng ({lat, lng});
  inputAddressElement.value = `${lat}, ${lng}`;
};

resetButtonElement.addEventListener('click', resetMap);// обработка конопки ресет на карте

export {showMap, LAT_CENTER, LNG_CENTER, resetMap, redrawMap};
