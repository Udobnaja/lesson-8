import {Dispatcher} from "../dispatcher/index";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {Logger, messageType} from "../../log/index";

export class Store extends Logger{

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
        Store.dispatcher = dispatcher;

        for (let key in callbacks){
            this.dispatcher.register(key, callbacks[key]);
        }

        this._state.next(state);

        return this._instance;
    }

    get subject(){
        return Store._state
    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        this.log(`STORE CHANGE ${Object.keys(payload)} KEYS`, messageType.INFO);
        Store._state.next(Object.assign(this.state, payload));
    }
}

