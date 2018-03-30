import {Dispatcher} from "../dispatcher/index";
import {IAction} from "../action/index";
import { Observer } from 'rxjs/Observer';
import {Observable, BehaviorSubject} from "rxjs";

// @TODO: ПРИВЕДИ К ОДНОМУ СТИЛЮ (так как сейчас уже есть private, не нжуно использовать эти нэйминг нотации с нижним подчеркиванием)

// если не эмиттер на обсервер
// сделать синглтон
export class Store {
    protected static _instance:Store = new Store;
    protected static dispatcher: Dispatcher;
    /*private */dispatcherToker;

    protected static _state = new BehaviorSubject<any>({});

    state$: Observable<any>;

    private constructor() {
        if (Store._instance) {
            throw new Error("Instantiation failed: "+
                "use Singleton.getInstance() instead of new.");
        }
    }

    public static createStore({
        dispatcher,
        state,
        callbacks
    }){
        Store.dispatcher = dispatcher;
        for (let key in callbacks){
            Store.dispatcher.register(key, callbacks[key]);
        }


        Store._state.next(state);

        return this._instance;

    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        Store._state.next(Object.assign(this.state, payload));
    }
}

