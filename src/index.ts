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
import {LOG_TYPE} from './actions/'
//
const dispatcher = new Dispatcher(); // должен быть один на все приложение - это Singleton  надо написать
// Store also singleton

const input = document.querySelector('input');

input.addEventListener('click', () => {
    dispatcher.dispatch({type: LOG_TYPE.UPDATE, payload: 'Click on Input'});
});

// У меня есть подозрение, что лог должен быть взаимодествия всего приложения

// should contain logic and model
// т.е никакой логики связаной диспатчера из стора не должно быть, как в примере Flux для глупых

// а еще это стор должен уметь логировать
// вопрос логировать он должен от базы уметь или например имлементить интерфейс, как тогда его привязать ко всем чихам

const state = {
    log: '',
    logList: []
};

// если я захочу выносить стор в дургое место , мне проще будет добавить ему методы через для например общения с колбеками

const store = Store.createStore({
    dispatcher,
    state,
    callbacks: { // mutations
        [LOG_TYPE.UPDATE]: (payload) => { // update Log
            store.changeEvent({log: payload});
        },
    },
});

// store.$action.subscribe((payload) => {
//     switch(payload.type){
//         case TYPE.CLICK:
//             // store.state.log = 'Вфвуди что-что мне пожалуйста';
//             log.innerHTML += `\n${payload.type}`;
//             console.log('Вфвуди что-что мне пожалуйста ');
//             break;
//         case TYPE.ANOTHER_CLICK:
//             log.innerHTML += `\n${payload.type}`;
//             // store.state.log = 'Another Clck';
//             console.log('hhhhа ');
//             break;
//         default:
//             console.log('У нас такого совсем нет или инициализация произошла');
//     }
// });

// ВООБЩЕ КАК БЫ ВЬШКА ДОЛЖНА ПОДПИСАТЬСЯ НА СТОР

const log = document.querySelector('.log');


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


