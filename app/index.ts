import './styles.scss';
import './store/';

import {Dispatcher} from '../modules/flux/';
import {INPUT_TYPE} from './actions/';

const input = document.querySelector('input');
const button = document.querySelector('.view-stub__apply');

const dispatcher = new Dispatcher(); //  можно создать через new, но он все равно SingleTon

button.addEventListener('click', () => {
    dispatcher.dispatch({type: INPUT_TYPE.CLICK}); // payload необязательный
});

input.addEventListener('keyup', function(){
    dispatcher.dispatch({type: INPUT_TYPE.KEYUP, payload: this.value});
});

// ----------------------------- WHAT I WANT LOG --------------------------------// это не нужно логиоовать
// DOCUMENT READY
// WINDOW ON LOAD
// WINDOW ON RESIZE
// DOCUMENT SCROLL
// ON CLICK INPUT
// ON HOVER INPUT
// ON FOCUS INPUT
// ON CLICK BUTTON
// ON HOVER BUTTON
// ON FOCUS BUTTON


