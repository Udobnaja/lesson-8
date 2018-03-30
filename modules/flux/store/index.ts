import {Dispatcher} from "../dispatcher/index";
import {IAction} from "../action/index";
import { Observer } from 'rxjs/Observer';
import {Observable, BehaviorSubject} from "rxjs";

// если не эмиттер на обсервер
// сделать синглтон
export class Store {
    protected static _instance:Store = new Store;
    state$: Observable<any>;
    private _state;
    protected static dispatcher: Dispatcher;
    /*private */dispatcherToker;


    private action = new BehaviorSubject<any>('');
    $action = this.action.asObservable();

    // при конструкторе верно ли делать такое DI, в оригинале какое то create там Store

    private constructor() {
        this._state = {};
        // this.dispatcher.register((p) => { // вообще же тут должен регистрироваться колбек
        //    this.invokeCallback(p);
        // });
        // if (Store._instance) {
        //     throw new Error("Instantiation failed: "+
        //         "use Singleton.getInstance() instead of new.");
        // }
    }

    public static createStore({
        dispatcher,
        callbacks
    }){
        Store.dispatcher = dispatcher;
        for (let key in callbacks){
            Store.dispatcher.register(key, callbacks[key]);
        }

    }

    changeEvent(payload) {
        this.action.next(payload)
    }

    private invokeCallback(payload){
        this.changeEvent(payload);
        // console.log(payload);
        // next(action: Action) {
        //     this._dispatcher.next(action);
        // }
        // здесь в абстракции должна поизойти какая то магия
    }

}

