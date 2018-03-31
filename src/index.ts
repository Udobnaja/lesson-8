import './styles.scss';

function sendToServer(data) {

    const event = new CustomEvent('dataIsSent', { detail: data });

    document.dispatchEvent(event);
}

import {Dispatcher, Store} from '../modules/flux/';
import {DATA_TYPE, INPUT_TYPE} from './actions/';

import {Logger, ILog} from "../modules/log/index";
import {View} from "../modules/flux/view/index";
//
const dispatcher = new Dispatcher(); //  можно создать через new, но он все равно SingleTon

const input = document.querySelector('input');
const button = document.querySelector('.view-stub__apply');
const label = document.querySelector('.view-stub__label');

button.addEventListener('click', () => {
    dispatcher.dispatch({type: DATA_TYPE.SEND}); // payload необязательный
});

input.addEventListener('keyup', function(){
    dispatcher.dispatch({type: INPUT_TYPE.KEYUP, payload: this.value});
});

const state = {
    log: '',
    logList: []
};

// если я захочу выносить стор в дургое место , мне проще будет добавить ему методы через для например общения с колбеками (changeEvent)

const store = Store.createStore({
    dispatcher,
    state,
    callbacks: { // mutations
        [DATA_TYPE.SEND]: () => {
            store.changeEvent({data: store.state.currentData}); //  мутирем стор только через change Event
        },
        [INPUT_TYPE.KEYUP]: (payload) => {
            store.changeEvent({currentData: payload});
        }
    },
});

const LogNode = new View(label, store.state$);

LogNode.render('data');


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


