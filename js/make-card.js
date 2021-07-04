import {TYPE_HOUSE } from './setup.js';
const templateCard = document.querySelector('#card').content.querySelector('article');
const cardElement = templateCard.cloneNode(true);
const photoParent = cardElement.querySelector('.popup__photos');
const photoChild = cardElement.querySelector('.popup__photo');
const cardDescription = cardElement.querySelector('.popup__description');

const generateCardElement = function(card) {
//const cardDescription = cardElement.querySelector('.popup__description');
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPE_HOUSE[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;


  cardDescription.textContent = card.offer.description;
  //проверка и скрытие пустых элементов
  if (!card.offer.description) { cardDescription.textContent = ''; }


  cardElement.querySelector('.popup__avatar').src = card.author.avatar;


  //сборка и вставка фотографий
  photoParent.innerHTML = '';
  if (card.offer.photos) {
    cardElement.querySelector('.popup__photos').classList.remove('visually-hidden');
    card.offer.photos.forEach((item) =>  {
      const photo = photoChild.cloneNode(true);
      photo.src = item;
      photoParent.appendChild(photo);
    });}
  else if (cardElement.querySelector('.popup__photos')) {
    //скрывает блок если нет фото
    cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
  }

  return cardElement;
};

export {generateCardElement};
