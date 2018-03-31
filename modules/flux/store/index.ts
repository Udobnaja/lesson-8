import {Dispatcher} from "../dispatcher/index";
import {messageType, HTMLLogger} from "../../log/index";
import {Observable} from "../../observer/index";

const TYPE = 'STORE';

export class Store extends HTMLLogger {

    private constructor() {
        super();

        Store._state = new Observable({});
        this.state$ = Store._state;

        if (Store._instance) {
            throw new Error("only one Store is Allowed");
        }
    }

    protected static _instance: Store = new Store;
    protected static dispatcher: Dispatcher;

    protected static _state;
    public state$;

    public static createStore({
        dispatcher,
        state,
        callbacks
    }){

        Store.prototype.log(`${TYPE} WAS CREATED`, messageType.INFO); // это не выводит в HTML
        Store.dispatcher = dispatcher;

        for (let key in callbacks){
            this.dispatcher.register(key, callbacks[key]);
        }

        Store._state.next(state);

        return this._instance;
    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        const keys = Object.keys(payload);
        const log = (keys.length) ? `${TYPE} CHANGE ${keys} KEYS` : '${TYPE} CHANGE EVENT FIRED WITH EMPTY PAYLOAD';
        this.log(log, messageType.INFO);
        if (keys.length){ // для того чтобы рендер выполнялся только при наличии payload
            Store._state.next(Object.assign(this.state, payload));
        }
    }
}

