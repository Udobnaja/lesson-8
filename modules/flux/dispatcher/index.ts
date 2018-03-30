import {IAction} from "../action/index";
import {Logger, messageType} from "../../log/";



const TYPE = 'DISPATCHER';
// сделать сингл тон
export class Dispatcher extends Logger {
    constructor() {
        // можно добавлять id типа что то hash походу
        // this.id = 0;
        super();

        this.callbacks = new Map(); //{}
    }

    private callbacks;
    private id;

    register(type: string, callback:Function) {

        if (!this.callbacks.has(type)){
            this.callbacks.set(type, []);
        }

        this.callbacks.get(type).push(callback);

        this.log(`${TYPE} REGISTER ${type} CALLBACK`, messageType.INFO);

        // this.id++;
        /* возвращать id е доплюсованное*/
    }

    dispatch(action: IAction<any>) {

        if (this.callbacks.has(action.type)){
            this.callbacks.get(action.type).forEach((callback) => {
                callback(action.payload);
                this.log(`${TYPE} DISPATCH ${action.type} CALLBACK`, messageType.INFO);
            });
        } else {
            this.log(`${TYPE} DISPATCH ERRORS ON TYPE ${action.type} CALLBACK`, messageType.ERROR);
        }
    }

    unregister(){
        // удаляшки id
    }
}
