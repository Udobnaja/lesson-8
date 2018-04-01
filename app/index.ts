import './styles.scss';

import './modules/flux/views/log';
import './modules/flux/views/form';
import './modules/flux/store/';

import { Dispatcher } from '../modules/flux/';
import { INPUT_TYPE, BUTTON_TYPE } from './modules/flux/actions/';

import { MVPView } from './modules/mvp/views/index';
import { MVPPresenter } from './modules/mvp/presenters/index';
import { MVPModel } from './modules/mvp/model/index';

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

    const view = new MVPView(mvp).provide(MVPPresenter, MVPModel);

    const button = view.node.querySelector('.view-stub__apply');
    const input = view.node.querySelector('input');

    button.addEventListener('click', () => {
        view.click();
    });

    input.addEventListener('keyup',  () => {
       view.keyup();
    });
};


MVPInit();





