import './styles.scss';

import './modules/flux/views/log';
import './modules/flux/store/';

import { Dispatcher } from '../modules/flux/';
import { INPUT_TYPE, BUTTON_TYPE } from './modules/flux/actions/';

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

    const button = view.node.querySelector('.view-stub__apply');
    const input = view.node.querySelector('input');

    button.addEventListener('click', () => {
        view.click();
    });

    input.addEventListener('keyup', function () {
       view.keyup();
    });
};


MVPInit();





