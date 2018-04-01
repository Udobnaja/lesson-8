import {HTMLLogger, messageType} from "../../log/index";
export class Model extends HTMLLogger{
    private _state = {};

    constructor(){
        super();
        this.HTMLNode = document.querySelector('.mvp').querySelector('.log');
    }

    sendToServer(data){
        this.log('MODEL SEND DATA TO SERVER' + data, messageType.INFO);

        return {data: data};
    }

    update(data){
        this._state = Object.assign(this._state, data);
        this.log(`MODEL UPDATE DATA ${Object.keys(data)}`, messageType.INFO);
    }
}


// хранит логику