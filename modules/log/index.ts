export enum messageType {
    INFO,
    ERROR
}

export interface ILog {
    log(message: string, type: messageType): void;
}

export class Logger implements ILog {
    log(message, type){
        if (type === messageType.ERROR){
            console.error(message);
        } else {
            console.log(message);
        }
    }
}

export class HTMLLogger extends Logger {
    private _node;

    constructor(){
        super();
    }

    set node(value) {
        this._node = value;
    }

    log(message, type){
        super.log(message, type);
        if (this._node){
            this._node.innerHTML += message;
        } else {
            throw Error('HTML container for log should be specified');
        }
    }
}