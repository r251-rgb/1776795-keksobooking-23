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

const setFilePreview = function(element, preview) {// функция загрузки аватара
  if (!validFileType(element.files[0])) { // проверка типа файла
    onErrorFileModal();
    return;
  }

  const newReader = new FileReader();
  newReader.onloadend = function () {
    preview.src = newReader.result;
  };
  if (element.files[0]) {
    newReader.readAsDataURL(element.files[0]);
  } else {
    preview.src = '';
  }
};
//====================================================================


// const imageElement = document.querySelector('#images');
// const imagePreviewElement = document.querySelector('.ad-form__photo img');

// cardElement.querySelector('.popup__avatar').src = card.author.avatar;

//   //сборка и вставка фотографий
//   photoParentElement.innerHTML = '';
//   if (card.offer.photos) {
//     cardElement.querySelector('.popup__photos').classList.remove('visually-hidden');
//     card.offer.photos.forEach((item) =>  {
//       const photo = photoChildElement.cloneNode(true);
//       photo.src = item;
//       photoParentElement.appendChild(photo);
//     });}


export {setFilePreview};
