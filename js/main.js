const TITLES = ['Объект1', 'Объект2', 'Объект3', 'Объект4', 'Объект5', 'Объект6'];
const TYPE_OFFERS = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN = ['12:00', '13:00', '14:00'];
const CHECK_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const DESCRIPTIONS = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6'];
const PRICE_RANGE = [100, 5000];
const NUMBER_GUEST = [1, 5];
const NUMBER_ROOMS = [1, 7];
const NUMBER_GENERATE_CARD = 10;
const LOCATION_X_RANGE = [35.65000,  35.70000];
const LOCATION_Y_RANGE = [139.70000, 139.80000];


function getRandomFloat (min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getFeatures () {
  const numberElements = getRandomInteger(1,6);
  let tmpArray = [];
  if (numberElements === 6) {
    tmpArray = FEATURES;
    return tmpArray;
  }
  tmpArray.fill(null, 0, numberElements) ;

  for (let i=0; i < numberElements ; i++) {
    const currentElement = FEATURES[getRandomInteger(0,5)];
    if (tmpArray.some((currentValue) => currentValue === currentElement )) {
      i--;
      continue;
    }
    else {
      tmpArray[i] = currentElement;
    }
  }
  return tmpArray;
}

function getPhoto () {
  const tmpArray =[];
  for (let i=0; i < getRandomInteger(1,PHOTOS.length) ; i++) {
    tmpArray[i] = PHOTOS[i];
  }
  return tmpArray;
}

function getLocation() {
  return ({
    lat : getRandomFloat( LOCATION_X_RANGE[0], LOCATION_X_RANGE[1] ,5),
    lng : getRandomFloat(LOCATION_Y_RANGE[0], LOCATION_Y_RANGE[1] ,5),
  });
}

const createCardOffer = function() {
  const location = getLocation();

  return {
    author : {avatar :  `img/avatars/user0${  getRandomInteger(1,8)  }.png`},

    offer : {
      title : TITLES[getRandomInteger(0,5)],
      address : `${location.lat}, ${location.lng}`,
      price : getRandomInteger(PRICE_RANGE[0],PRICE_RANGE[1]),
      type : TYPE_OFFERS[getRandomInteger(0,4)],
      rooms : getRandomInteger(NUMBER_ROOMS[0], NUMBER_ROOMS[1]),
      guests : getRandomInteger(NUMBER_GUEST[0], NUMBER_GUEST[1]),
      checkin : CHECK_IN[getRandomInteger(0,2)],
      checkout : CHECK_OUT[getRandomInteger(0,2)],
      features : getFeatures(),
      description : DESCRIPTIONS[getRandomInteger(0,5)],
      photos : getPhoto(),
    },

    location : (location),

  };

};

const createCardArray = new Array(NUMBER_GENERATE_CARD).fill(null).map(() => createCardOffer() );

createCardArray.find();
