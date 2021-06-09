import {TITLES, TYPE_OFFERS, CHECK_IN, CHECK_OUT, FEATURES, PHOTOS, DESCRIPTIONS, PRICE_RANGE,
  NUMBER_GUEST, NUMBER_ROOMS, LOCATION_X_RANGE, LOCATION_Y_RANGE } from '../js/setup.js';

import {getRandomFloat, getRandomInteger} from '../js/utils.js';

//выбор неповторяющихся случайных значений массива
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

//выбор случайного количества эдементов массива
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

//генерация объекта полнойкарточки
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

export {createCardOffer};
