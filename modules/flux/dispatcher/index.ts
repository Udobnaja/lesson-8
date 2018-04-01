import { IAction } from '../action/index';
import { messageType, HTMLLogger } from '../../log/';

const TYPE = 'DISPATCHER';

export class Dispatcher extends HTMLLogger {
    constructor() {

        if (Dispatcher._instance) {
            return Dispatcher._instance;
        }
        super();
        this._callbacks = new Map();
    }

    private _callbacks;
    protected static _instance: Dispatcher = new Dispatcher;

    register(type: string, callback: Function) {

        if (!this._callbacks.has(type)) {
            this._callbacks.set(type, []);
        }

        this._callbacks.get(type).push(callback);

        this.log(`${TYPE} REGISTER ${type} CALLBACK`, messageType.INFO);
    }

    dispatch(action: IAction<any>) {
        
        if (this._callbacks.has(action.type)) {
            this._callbacks.get(action.type).forEach((callback) =>  {
                this.log(`${TYPE} DISPATCH ${action.type} CALLBACK`, messageType.INFO);
                callback(action.payload);
            });
        } else {
            this.log(`${TYPE} DISPATCH ERRORS ON TYPE ${action.type} CALLBACK`, messageType.ERROR);
        }
    }

    unregister(type, index: number) {
        if (this._callbacks.has(type)) {
            const callbacks = this._callbacks.get(type);
            if (index < callbacks.length && index >= 0) {
                this._callbacks.get(type).splice(index, 1);
                this.log(
                    `${TYPE} UNREGISTER ${type} CALLBACK with index ${index}`,
                    messageType.INFO,
                );
            }
        }
    }
}
