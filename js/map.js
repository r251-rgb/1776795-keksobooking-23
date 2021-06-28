import {enablePage, enableFilters} from '../js/form.js';
import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.reset__map');
const latCenter =   (35.680174645).toFixed(5);
const lngCenter = (139.7539934567).toFixed(5);


let lat = +latCenter;
let lng = +lngCenter;

const showMap = function() {

  inputAddress.value = `${lat}, ${lng}`;
  // /* global L:readonly */
  const map = L.map('map-canvas')
    .on('load', () => {
      enablePage();
    })

    .setView({lat, lng}, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    .addTo(map);

  //главный маркер
  const mainIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPin = L.marker(
    {lat, lng},
    {
      draggable: true,
      icon: mainIcon,
    });

  mainPin
    .addTo(map);

  //после перемещения маркера передает координаты в поле адреса
  mainPin.on('moveend', (evt) => {
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  //создание слоя layerGroup
  const pinGroup = L.layerGroup().addTo(map);

  // функция создание маркеров из массива
  const createMarker = function  (array) {
    //получает массив из строки координат
    lat =  array.offer.address.split(', ')[0];
    lng = array.offer.address.split(', ')[1];

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
      .addTo(pinGroup)
      .bindPopup(() => generateCardElement(array)); //замыкание
  };


  //вызов фунции создания маркеров с конкретнвм массивом
  createCardArray.forEach((card) => {
    createMarker(card);

    //разрешает разблокировку фильтров
    enableFilters();
  });


  // обработка конопки ресет на карте
  resetButton.addEventListener('click', () => {
    lat = latCenter;
    lng = lngCenter;
    map.setView({lat, lng}, 12);
    mainPin.setLatLng ({lat, lng});
    inputAddress.value = `${lat}, ${lng}`;
  });

  //удаление слоя с простыми метками
  //markerGroup.clearLayers();

};
export {showMap};
