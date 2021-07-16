import {validateFieldForm, submitForm, onSuccessSend, onErrorSend} from './form-validations.js'; //функции валидации форм;
import {initializeMap} from '../js/map.js'; //отрисовка карты;
import {getData} from '../js/api-server.js';
import {setPageDisable} from '../js/form.js';
import {showModalWindow} from '../js/modal.js';

setPageDisable();

validateFieldForm();

getData((card) => initializeMap(card), () => showModalWindow('loadError'));

submitForm(() => onSuccessSend, () => onErrorSend);


