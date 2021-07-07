const errorPopup = document.querySelector('#error').content.querySelector('div');
const successPopup = document.querySelector('#success').content.querySelector('div');
const errorLoadPopup = document.querySelector('#errorLoad').content.querySelector('div');
const main = document.querySelector('main');

const onModalClose = function (evt) {
  if (evt.keyCode === 27 || (evt.type === 'click')) {
    evt.preventDefault();
    errorPopup.classList.add('hidden');
    successPopup.classList.add('hidden');
    errorLoadPopup.classList.add('hidden');
    errorPopup.removeEventListener('click', onModalClose);
    successPopup.removeEventListener('click', onModalClose);
    errorLoadPopup.removeEventListener('click', onModalClose);
    document.removeEventListener('keydown', onModalClose);//убирает обработчики
  }
};

const onErrorModal = function () {
  errorPopup.classList.remove('hidden');
  main.insertAdjacentElement('afterbegin', errorPopup);//показывает окно
  errorPopup.addEventListener('click', onModalClose);//вешает закрытие на обработчик
  document.addEventListener('keydown', onModalClose);

};

const onSuccessModal = function () {
  successPopup.classList.remove('hidden');
  main.insertAdjacentElement('afterbegin', successPopup);//показывает окно
  successPopup.addEventListener('click', onModalClose);//вешает закрытие на обработчик
  document.addEventListener('keydown', onModalClose);
};

const onErrorLoadModal = function () {
  errorLoadPopup.classList.remove('hidden');
  main.insertAdjacentElement('afterbegin', errorLoadPopup);//показывает окно
  errorLoadPopup.addEventListener('click', onModalClose);//вешает закрытие на обработчик
  document.addEventListener('keydown', onModalClose);
};
export{onErrorModal, onSuccessModal, onErrorLoadModal};//, onSuccessModal
