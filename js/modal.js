const errorPopupElement = document.querySelector('#error').content.querySelector('div');
const successPopupElement = document.querySelector('#success').content.querySelector('div');
const errorLoadPopupElement = document.querySelector('#errorLoad').content.querySelector('div');
const errorFilePopupElement = document.querySelector('#errorFile').content.querySelector('div');
const mainElement = document.querySelector('main');

const onErrorModal = function (errorId) {
  let errorElement = '';
  switch (errorId) {
    case 'fileError':
      errorElement = errorFilePopupElement;
      break;
    case 'loadError':
      errorElement = errorLoadPopupElement;
      break;
    case 'sendError':
      errorElement = errorPopupElement;
      break;
    case 'ok':
      errorElement = successPopupElement;
      break;
    default:
      errorElement = successPopupElement;
  }

  const onModalClose = function (evt) {
    if (evt.keyCode === 27 || (evt.type === 'click')) {
      evt.preventDefault();
      const mainDiv = document.querySelector('main .error, main .success');
      errorElement.removeEventListener('click', onModalClose);
      document.removeEventListener('keydown', onModalClose);//убирает обработчики
      mainElement.removeChild(mainDiv);
    }
  };

  mainElement.insertAdjacentElement('afterbegin', errorElement);//показывает окно
  errorElement.addEventListener('click', onModalClose);//вешает обработчик  на закрытие
  document.addEventListener('keydown', onModalClose);
};

export{onErrorModal};//, onSuccessModal
