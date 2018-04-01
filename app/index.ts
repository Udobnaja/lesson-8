import './styles.scss';

import './views/log';
import './store/';

import { Dispatcher } from '../modules/flux/';
import { INPUT_TYPE, BUTTON_TYPE } from './actions/';

import {View} from "../modules/mvp/view/index";

const FLUXInit = () => {

    const flux = document.querySelector('.flux');
    const input = flux.querySelector('input');
    const button = flux.querySelector('.view-stub__apply');

    const dispatcher = new Dispatcher(); //  можно создать через new, но он все равно SingleTone

    button.addEventListener('click', () => {
        dispatcher.dispatch({ type: BUTTON_TYPE.CLICK }); // payload необязательный
    });

    input.addEventListener('keyup', function () {
        dispatcher.dispatch({ type: INPUT_TYPE.KEYUP, payload: this.value });
    });
};

FLUXInit();

/////////////////////////// Ст

const MVPInit = () => {

    const mvp = document.querySelector('.mvp');

    const view = new View(mvp);

    const button = mvp.querySelector('.view-stub__apply');

    button.addEventListener('click', () => {
        view.click();
    });
};


MVPInit();





