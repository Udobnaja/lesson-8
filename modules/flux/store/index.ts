import {Dispatcher} from "../dispatcher/index";
import {IAction} from "../action/index";
import { Observer } from 'rxjs/Observer';
import {Observable, BehaviorSubject} from "rxjs";
import {Logger, messageType} from "../../log/index";

// @TODO: ПРИВЕДИ К ОДНОМУ СТИЛЮ (так как сейчас уже есть private, не нжуно использовать эти нэйминг нотации с нижним подчеркиванием)



export class Store extends Logger{

    private constructor() {
        super();
        Store._state = new BehaviorSubject<any>({});
        this.state$ = Store._state.asObservable();
        if (Store._instance) {
            throw new Error("Instantiation failed: "+
                "use Singleton.getInstance() instead of new.");
        }
    }

    protected static _instance: Store = new Store;
    protected static dispatcher: Dispatcher;
    /*private */dispatcherToker;

    protected static _state;
    public state$;

    public static createStore({
        dispatcher,
        state,
        callbacks
    }){
        Store.dispatcher = dispatcher;

        for (let key in callbacks){
            Store.dispatcher.register(key, callbacks[key]);
        }

        console.log('CREATE STORE');

        Store._state.next(state);

        return this._instance;
    }

    get subject(){
        return Store._state
    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        this.log(`STORE CHANGE EVENT ${payload}`, messageType.INFO);
        Store._state.next(Object.assign(this.state, payload));
    }
}

