import {HTMLLogger, messageType} from "../log/index";
import {Observer} from "../../observer/index";
export class View extends HTMLLogger implements Observer {

    private key;

    constructor(private node, private _observable){
        super();
        this.node = node;
        this._observable = _observable;
        this._observable.registerObserver(this);

    }

    public render(key){
        this.key = key;
    }

    update(state){
        if (state[this.key] !== undefined){
            this.node.innerHTML = state[this.key];
            this.log('RENDER VIEW', messageType.INFO);
        }

    }
}