import './styles.scss';
import './views/log';
import './store/';

import {Dispatcher} from '../modules/flux/';
import {INPUT_TYPE} from './actions/';

const input = document.querySelector('input');
const button = document.querySelector('.view-stub__apply');

const dispatcher = new Dispatcher(); //  можно создать через new, но он все равно SingleTone

button.addEventListener('click', () => {
    dispatcher.dispatch({type: INPUT_TYPE.CLICK}); // payload необязательный
});

input.addEventListener('keyup', function(){
    dispatcher.dispatch({type: INPUT_TYPE.KEYUP, payload: this.value});
});


