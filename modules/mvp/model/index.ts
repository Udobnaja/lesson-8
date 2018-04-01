import { HTMLLogger, messageType } from '../../log/index';
export class Model extends HTMLLogger{
    private _state = {};

    constructor(){
        super();
        this.HTMLNode = document.querySelector('.mvp').querySelector('.log');
    }

    set state(data){
        this._state = Object.assign(this._state, data);
    }

    get state(){
        return this._state;
    }
}


// хранит логику
