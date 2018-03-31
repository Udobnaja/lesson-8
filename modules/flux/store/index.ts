import {Dispatcher} from "../dispatcher/index";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {messageType, HTMLLogger} from "../log/index";

// ПС ХОЧУ БЛИН ЭКСТЕНДИТЬ ДВА КЛАССА!!!

export class Store extends HTMLLogger {

    private constructor() {
        super();
        Store._state = new BehaviorSubject<any>({});
        this.state$ = Store._state.asObservable();
        if (Store._instance) {
            throw new Error("only one Store Prohibited");
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

        Store.prototype.log('STORE WAS CREATED', messageType.INFO); // это не выводит в HTML
        Store.dispatcher = dispatcher;

        for (let key in callbacks){
            this.dispatcher.register(key, callbacks[key]);
        }

        this._state.next(state);

        return this._instance;
    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        const keys = Object.keys(payload);
        const log = (keys.length) ? `STORE CHANGE ${keys} KEYS` : 'STORE CHANGE EVENT FIRED';
        this.log(log, messageType.INFO);
        if (keys.length){ // для того чтобы рендер выполнялся только при наличии payload
            Store._state.next(Object.assign(this.state, payload));
        }

    }
}

