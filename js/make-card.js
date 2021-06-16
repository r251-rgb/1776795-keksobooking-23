import {TYPE_HOUSE } from './setup.js';
const templateCard = document.querySelector('#card').content.querySelector('article');
const cardElement = templateCard.cloneNode(true);
const photoParent = cardElement.querySelector('.popup__photos');
const photoChild = cardElement.querySelector('.popup__photo');

const generateCardElement = function(card) {

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPE_HOUSE[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  //сборка и вставка фотографий
  photoParent.innerHTML = '';
  card.offer.photos.forEach((item) =>  {
    const photo = photoChild.cloneNode(true);
    photo.src = item;
    photoParent.appendChild(photo);
  });

  //проверка и скрытие пустых элементов
  if (!card.offer.description) {cardElement.querySelector('.popup__description').remove();}
  //если надо скрывать DIV при отсутствии фото
  //if (!card.offer.photos[0]) {cardElement.querySelector('.popup__photos').remove();}

  return cardElement;
};

export {generateCardElement};
