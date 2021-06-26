import {enablePage} from '../js/form.js';
import {createCardArray} from '../js/create-card.js'; //функция генерации карточек
import {generateCardElement} from '../js/make-card.js'; //функция генерации карточек


const inputAddress = document.querySelector('#address');
const center =   [
  {

    lat: 35.68017,
    lng: 139.75399,
  },
];

let lat = center[0].lat.toFixed(5);
let lng = center[0].lng.toFixed(5);


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
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
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
    .addTo(map)
    .bindPopup(title);

  //после перемещения маркера передает координаты в поле адреса
  mainPin.on('moveend', (evt) => {
    inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  //простые маркеры
  createCardArray.forEach((item, index) => {
    lat =  +(createCardArray[index].offer.address.slice(0,8));
    lng = +(createCardArray[index].offer.address.slice(-9));
    // const titl = createCardArray[index].offer.title;

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

    // const as = () => generateCardElement(item);
    othersPin
      .addTo(map)
      .bindPopup(() => generateCardElement(item)); //замыкание
  });

};

export {showMap};
