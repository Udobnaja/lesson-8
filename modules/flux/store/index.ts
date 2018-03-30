import {Dispatcher} from "../dispatcher/index";
import {IAction} from "../action/index";

// если не эмиттер на обсервер
// сделать синглтон
export class Store {
    // protected static _instance:Store = new Store;
    private _state;
    private dispatcher: Dispatcher;
    /*private */dispatcherToker;

    // при конструкторе верно ли делать такое DI, в оригинале какое то create там Store

    constructor(dispatcher: Dispatcher) {
        this._state = {};
        this.dispatcher = dispatcher;
        this.dispatcher.register((p) => {
           this.invokeCallback(p);
        });
        // if (Store._instance) {
        //     throw new Error("Instantiation failed: "+
        //         "use Singleton.getInstance() instead of new.");
        // }
    }

    private invokeCallback(payload){
        console.log(payload);
        // здесь в абстракции должна поизойти какая то магия
    }

}

