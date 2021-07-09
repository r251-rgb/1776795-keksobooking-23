const templateCardElement = document.querySelector('#card').content.querySelector('article');
const cardElement = templateCardElement.cloneNode(true);
const photoParentElement = cardElement.querySelector('.popup__photos');
const photoChildElement = cardElement.querySelector('.popup__photo');
const cardDescriptionElement = cardElement.querySelector('.popup__description');
const TypeHouse = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const generateCardElement = (card) => {
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TypeHouse[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;


  cardDescriptionElement.textContent = card.offer.description;
  //проверка и скрытие пустых элементов
  if (!card.offer.description) {
    cardDescriptionElement.textContent = '';
  }

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  //сборка и вставка фотографий
  photoParentElement.innerHTML = '';
  if (card.offer.photos) {
    cardElement.querySelector('.popup__photos').classList.remove('visually-hidden');
    card.offer.photos.forEach((item) =>  {
      const photo = photoChildElement.cloneNode(true);
      photo.src = item;
      photoParentElement.appendChild(photo);
    });}
  else if (cardElement.querySelector('.popup__photos')) {
    //скрывает блок если нет фото
    cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
  }

  return cardElement;
};

export {generateCardElement};
