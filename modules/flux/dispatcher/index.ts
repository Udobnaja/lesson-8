import {IAction} from "../action/index";
import {ILog} from "../../log/";

// сделать сингл тон
export class Dispatcher implements ILog{
    private callbacks;
    private id;

    constructor() {

        // тут может быть можно плясать от observable
        // можно добавлять id типа что то hash походу
        // this.id = 0;

        this.callbacks = new Map(); //{}
    }

    register(type: string, callback:Function) {

        if (!this.callbacks.has(type)){
            this.callbacks.set(type, []);
        }

        this.callbacks.get(type).push(callback);

        this.log(`|ON REGISTER| Register Callback type: ${type}`);

        // this.id++;
        /* возвращать id е доплюсованное*/
    }

    dispatch(action: IAction<any>) {  // sorry for any

        if (this.callbacks.has(action.type)){
            this.callbacks.get(action.type).forEach((callback) => {
                callback(action.payload);
                this.log(`|ON DISPATCH| Callback type: ${action.type} INVOKED`);
            });
        } else {
            throw new Error('not registered action');
        }
    }

    log(message: string){
        console.log(`FROM DISPATCHER: ${message}`);
    }


    unregister(){
        // удаляшки id
    }
}