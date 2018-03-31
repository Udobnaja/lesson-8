import './styles.scss';

const sendToServer = async (data) => {
    // Выполняется какая то асинхронная операция

    let id = await setTimeout(() => {
        dispatcher.dispatch({type: DATA_TYPE.SEND_SUCCESS, payload: (data) ? data : 'YOU SEND EMPTY DATA'});
        clearTimeout(id);
    }, 800);
};

import {Dispatcher, Store} from '../modules/flux/';
import {DATA_TYPE, INPUT_TYPE} from './actions/';
import {View} from "../modules/flux/view/index";

const input = document.querySelector('input');
const button = document.querySelector('.view-stub__apply');
const label = document.querySelector('.view-stub__label');

const dispatcher = new Dispatcher(); //  можно создать через new, но он все равно SingleTon

button.addEventListener('click', () => {
    dispatcher.dispatch({type: INPUT_TYPE.CLICK}); // payload необязательный
});

input.addEventListener('keyup', function(){
    dispatcher.dispatch({type: INPUT_TYPE.KEYUP, payload: this.value});
});

const state = {
    log: '',
    logList: [],
    currentData: ''
};

// если я захочу выносить стор в дургое место , мне проще будет добавить ему методы через для например общения с колбеками (changeEvent)

const store = Store.createStore({
    dispatcher,
    state,
    callbacks: { // mutations
        [INPUT_TYPE.CLICK]: () => {
            dispatcher.dispatch({type: DATA_TYPE.SEND_DATA});
            store.changeEvent({}); //  мутирем стор только через change Event
        },
        [INPUT_TYPE.KEYUP]: (payload) => {
            store.changeEvent({currentData: payload});
        },
        [DATA_TYPE.SEND_DATA]: () => {
            sendToServer(store.state.currentData);
            store.changeEvent({});
        },
        [DATA_TYPE.SEND_SUCCESS]: (payload) => {
            store.changeEvent({data: payload});
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


