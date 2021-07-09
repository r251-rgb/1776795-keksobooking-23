import {validateFieldForm, submitForm} from './form-validations.js'; //функции валидации форм;
import {showMap} from '../js/map.js'; //отрисовка карты;
import {getData} from '../js/api-server.js';
import {setPageDisable} from '../js/form.js';

setPageDisable();

validateFieldForm();

getData((card) => showMap(card), () => showMap());

// resetForm();
submitForm();


