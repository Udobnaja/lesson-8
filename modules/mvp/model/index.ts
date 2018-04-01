import {HTMLLogger, messageType} from "../../log/index";
export class Model extends HTMLLogger{
    private _state = {};

    constructor(){
        super();
        this.HTMLNode = document.querySelector('.mvp').querySelector('.log');
    }

    getState(){
        return this._state;
    }

    sendToServer(data){
        this.log('From model send to server ' + data, messageType.INFO);

        return {data: 'this.data From Server'};
    }

    update(data){
        this._state = Object.assign(this._state, data);
    }
}


// хранит логику