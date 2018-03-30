import './styles.scss';

// function sendToServer(data) {
//     console.log(data);
//
//     const event = new CustomEvent('dataIsSent', { detail: data });
//
//     document.dispatchEvent(event);
// }


// Пример обработки события dataIsSent. Рекомендуется изменить API модуля так,
// чтобы вызова события через document не было

// function test() {
//     document.addEventListener('dataIsSent', function(event) {
//         console.log('event got ' + event.detail);
//     });
//     sendToServer('mydata');
// }
//
import {Dispatcher, Store} from '../modules/flux/';
import {LOG_TYPE} from './actions/';

import {Logger, ILog} from "../modules/log/index";
//
const dispatcher = new Dispatcher(); // должен быть один на все приложение - это Singleton  надо написать
// Store also singleton

const input = document.querySelector('input');

input.addEventListener('click', () => {
    dispatcher.dispatch({type: LOG_TYPE.UPDATE, payload: 'Click on Input'});
});


//  Возможно здесь расширитьф ункцию лог до отрисовкив лог

// У меня есть подозрение, что лог должен быть взаимодествия всего приложения

// а еще это стор должен уметь логировать
// вопрос логировать он должен от базы уметь или например имлементить интерфейс, как тогда его привязать ко всем чихам
// Ну я же не могу диспатчить

const state = {
    log: '',
    logList: []
};

// если я захочу выносить стор в дургое место , мне проще будет добавить ему методы через для например общения с колбеками (changeEvent)

const store = Store.createStore({
    dispatcher,
    state,
    callbacks: { // mutations
        [LOG_TYPE.UPDATE]: (payload) => { // update Log
            let loglist = store.state.logList;
            loglist.push(payload);
            store.changeEvent({log: payload, loglist}); //  мутирем стор только через change Event
        },
    },
});


// ВООБЩЕ КАК БЫ ВЬШКА ДОЛЖНА ПОДПИСАТЬСЯ НА СТОР

const log = document.querySelector('.log');

store.state$.subscribe((e) => {
    if (e.logList){ // Please see on best practice article, this is not a good solution
        log.innerHTML = e.logList;
    }

}, (e) => {
    console.log('something GOING WRONG!!!!');
});

// view (observer) наблюдает за стором (Observable)

// стор (observer) наблюдает за ддиспатчером (Observable)

// VIEW
// - listen store changes
// - emit actions to dispatcher

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


