import {Store} from "../../modules/flux/store/index";
import {Dispatcher} from "../../modules/flux/dispatcher/index";
import {INPUT_TYPE, DATA_TYPE, BUTTON_TYPE} from "../actions/";
import {sendToServer} from "../services/data";
const dispatcher = new Dispatcher();
const state = {
    log: '',
    logList: [],
    currentData: '',
    data: 'Здесь появится ответ сервера'
};

export const store = Store.createStore({
    dispatcher,
    state,
    callbacks: { // mutations
        [BUTTON_TYPE.CLICK]: () => {
            dispatcher.dispatch({type: DATA_TYPE.SEND_DATA});
            //store.changeEvent({}); // может не стоит передовать стору пустые значения,
        },
        [INPUT_TYPE.KEYUP]: (payload) => {
            store.changeEvent({currentData: payload}); //  мутирем стор только через change Event
        },
        [DATA_TYPE.SEND_DATA]: () => {
            sendToServer(store.state.currentData).then((data) => {
                dispatcher.dispatch({type: DATA_TYPE.SEND_SUCCESS, payload: (data) ? data : 'YOU SEND EMPTY DATA'});
                // store.changeEvent({});
            }).catch((e) => {
                dispatcher.dispatch({type: DATA_TYPE.SEND_ERROR});
                // store.changeEvent({});
            })

        },
        [DATA_TYPE.SEND_SUCCESS]: (payload) => {
            store.changeEvent({data: payload});
        }
    },
});
