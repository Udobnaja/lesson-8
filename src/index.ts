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

// походу стор свой эксендить  от стора там прописывать case
// а еще это стор должен уметь логировать
// вопрос логировать он должен от базы уметь или например имлементить интерфейс, как тогда его привязать ко всем чихам

class LoggerStore extends Store {
    // пока не пойму как тут case то делать
}

const store = new LoggerStore(dispatcher);

console.log(store);



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


