import {Store} from "../../modules/flux/store/index";
import {Dispatcher} from "../../modules/flux/dispatcher/index";
import {INPUT_TYPE} from "../actions/input";
import {DATA_TYPE} from "../actions/data";
import {sendToServer} from "../services/data";
const dispatcher = new Dispatcher();
const state = {
    log: '',
    logList: [],
    currentData: ''
};

export const store = Store.createStore({
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
            sendToServer(store.state.currentData).then(() => {
                store.changeEvent({});
            }).catch((e) => {
                console.error(e);
            })

        },
        [DATA_TYPE.SEND_SUCCESS]: (payload) => {
            store.changeEvent({data: payload});
        }
    },
});
