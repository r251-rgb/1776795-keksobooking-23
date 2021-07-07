import {onErrorModal} from '../js/modal.js';
import {resetForm} from '../js/form-validations.js';

const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((card) => {
            onSuccess(card);
          });

      } else {
        throw 'test';
      }
    })
    .catch(() => {
      onErrorModal('load');
      onError();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onErrorModal('ok');
        resetForm();

      } else {
        throw('any');
      }
    })
    .catch(() => {
      onErrorModal('send');
    });
};

export {getData, sendData};
