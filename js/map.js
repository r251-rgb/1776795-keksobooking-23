import {enablePage, enableFilters} from '../js/form.js';
import {defaultRoomSelector} from '../js/form-validaty.js';
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.reset__map');
const latCenter =   (35.680174645).toFixed(5);
const lngCenter = (139.7539934567).toFixed(5);
let lat = +latCenter;
let lng = +lngCenter;

const showMap = function(loadedCardData) {
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
    .addTo(map);//добавляет на карту главный пин

  mainPin.on('moveend', (evt) => {//после перемещения пина передает координаты в поле адреса
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });


  if (loadedCardData) { //если метки загружены с сервера то отрисовать их
    const pinGroup = L.layerGroup().addTo(map);  //создание слоя layerGroup для простых маркеров
    loadedCardData.forEach((card) => {

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
        .addTo(pinGroup)
        .bindPopup(() => generateCardElement(card)); //замыкание
    });
    enableFilters();      //разрешает разблокировку фильтров
  }
  //удаление слоя с простыми метками
  //markerGroup.clearLayers();


  const form = document.querySelector('.ad-form');
  const formResetButton = document.querySelector('.ad-form__reset');

  const resetMap = () => {//очистка карты
    lat = latCenter;
    lng = lngCenter;
    map.setView({lat, lng}, 12);
    mainPin.setLatLng ({lat, lng});
    inputAddress.value = `${lat}, ${lng}`;
  };

  const resetForm = (evt) => {//очистка формы
    evt.preventDefault();
    form.reset();
    inputAddress.value = `${latCenter}, ${lngCenter}`;
    defaultRoomSelector();
    resetMap();
  };




  formResetButton.addEventListener('click', resetForm ); //обработка кнопки сброса формы
  resetButton.addEventListener('click', resetMap);// обработка конопки ресет на карте

};

export {showMap, latCenter, lngCenter};
