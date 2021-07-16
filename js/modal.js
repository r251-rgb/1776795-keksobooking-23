const errorPopupElement = document.querySelector('#error').content.querySelector('div');
const successPopupElement = document.querySelector('#success').content.querySelector('div');
const errorLoadPopupElement = document.querySelector('#errorLoad').content.querySelector('div');
const errorFilePopupElement = document.querySelector('#errorFile').content.querySelector('div');
const mainElement = document.querySelector('main');

const showModalWindow = (errorId) => {
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

  const closePopup = () => {
    const mainDiv = document.querySelector('main .error, main .success');
    mainElement.removeChild(mainDiv);
  };

  const buttonKeydownHandler = (evt) => {
    if (evt.keyCode === 27 || evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const buttonClickHandler = () => {
    closePopup();
    // обработчик будет убран вместе с удалением окна DIV
    document.removeEventListener('keydown', buttonKeydownHandler);//убирает обработчики
  };

  mainElement.insertAdjacentElement('afterbegin', errorElement);//показывает окно
  errorElement.addEventListener('click', buttonClickHandler, {once : true});//вешает одноразовый обработчик  на закрытие
  document.addEventListener('keydown', buttonKeydownHandler, {once : true});

};

export{showModalWindow};
