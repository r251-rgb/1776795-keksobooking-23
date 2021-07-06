import {onErrorFileModal} from '../js/modal.js';
const FILE_TYPES = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg',
  'image/gif',
];

// проверка типов файлов при загрузке
const validFileType = function (file) {
  for(let i = 0; i < FILE_TYPES.length; i++) {
    if(file.type === FILE_TYPES[i]) {
      return true;
    }
  }
  return false;
};

// функция загрузки. загружаемый элемент, превью
const setFilePreview = function(element, preview) {
  // if (!validFileType(element.files[0])) { // проверка типа файла
  //   onErrorFileModal();
  //   return;
  // }

  const newReader = new FileReader();
  newReader.onloadend = function () {
    preview.src = newReader.result;
  };

  if (element.files[0] && preview !== null) {
    newReader.readAsDataURL(element.files[0]);
  } else {
    preview.src = 'img/muffin-grey.svg';
  }
};
//====================================================================


const imageElement = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

const setFileFlatPreview = function() {

  const file = imageElement.files[0];
  const aaaa = URL.createObjectURL(file);

  const ima = document.createElement('img');
  ima.setAttribute('height', '60px');
  ima.setAttribute('width', '60px');
  ima.setAttribute('alt', 'фото квартиры');
  imagePreview.appendChild(ima);
  // console.log(aaaa);
  ima.src = aaaa;
  console.log();
};

imageElement.addEventListener('change', setFileFlatPreview);//() => setFilePreview1(imageElement));

const resetFileFlatPreview = function() {
  while (imagePreview.firstChild) {
    imagePreview.removeChild(imagePreview.firstChild);
  }

};


// cardElement.querySelector('.popup__avatar').src = card.author.avatar;

// //сборка и вставка фотографий
// photoParentElement.innerHTML = '';
// if (card.offer.photos) {
//   cardElement.querySelector('.popup__photos').classList.remove('visually-hidden');
//   card.offer.photos.forEach((item) =>  {
//     const photo = photoChildElement.cloneNode(true);
//     photo.src = item;
//
//   });}

// imageElement.addEventListener('change', () => setFilePreview(imageElement, imagePreviewElement));

export {setFilePreview, resetFileFlatPreview};
