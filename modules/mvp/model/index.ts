import { HTMLLogger, messageType } from '../../log/index';
export class Model extends HTMLLogger{
    private _state = {};

    constructor(){
        super();
        this.HTMLNode = document.querySelector('.mvp').querySelector('.log');
    }

    update(data){
        this._state = Object.assign(this._state, data);
        this.log(`MODEL UPDATE DATA ${Object.keys(data)}`, messageType.INFO);
    }
}


// хранит логику
