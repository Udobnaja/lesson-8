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
import {TYPE} from './actions/'
//
const dispatcher = new Dispatcher(); // должен быть один на все приложение - это Singleton  надо написать
// Store also singleton

const input = document.querySelector('input');

input.addEventListener('click', () => {
    dispatcher.dispatch({type: TYPE.CLICK, payload: 'I am Click! from INPUT'});

    dispatcher.dispatch({type: TYPE.ANOTHER_CLICK, payload: 'I am Click! from INPUT - i am the same clone'});
});

// should contain logic and model
// т.е никакой логики связаной диспатчера из стора не должно быть, как в примере Flux для глупых

// а еще это стор должен уметь логировать
// вопрос логировать он должен от базы уметь или например имлементить интерфейс, как тогда его привязать ко всем чихам

const store = Store.createStore({
    dispatcher,
    callbacks: {
        [TYPE.CLICK]: (payload) => {
            console.log(payload);
        },
        [TYPE.ANOTHER_CLICK]: (payload) => {
            console.log('mutation', payload);
        }
    }
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


