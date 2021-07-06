import {onErrorFileModal} from '../js/modal.js';
const imagePreviewElement = document.querySelector('.ad-form__photo');


const FILE_TYPES = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg',
  'image/gif',
];

const checkValidFileType = function (file) {// проверка типов файлов при загрузке
  for(let i = 0; i < FILE_TYPES.length; i++) {
    if(file.type === FILE_TYPES[i]) {
      return true;
    }
  }
  return false;
};

const setFilePreview = function(element, preview) {// функция загрузки. загружаемый элемент, превью
  if ((element.files[0])) {
    if (!checkValidFileType(element.files[0])) { // проверка типа файла
      onErrorFileModal();
      return;
    }
  }
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

const setFileFlatPreview = function(imageElement) {// загрузка фото квартиры и превью
  if (!checkValidFileType(imageElement.files[0])) { // проверка типа файла
    onErrorFileModal();
    return;
  }
  const previewObj = URL.createObjectURL(imageElement.files[0]);
  const imageFlat = document.createElement('img');
  imageFlat.setAttribute('height', '60px');
  imageFlat.setAttribute('width', '60px');
  imageFlat.setAttribute('alt', 'фото квартиры');
  imagePreviewElement.appendChild(imageFlat);
  imageFlat.src = previewObj;
};

const resetFileFlatPreview = function() {
  while (imagePreviewElement.firstChild) {
    imagePreviewElement.removeChild(imagePreviewElement.firstChild);
  }
};


export {setFilePreview, resetFileFlatPreview, setFileFlatPreview};
