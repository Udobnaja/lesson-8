export enum messageType {
    INFO,
    ERROR,
}

export interface ILog {
     log(message: string, type: messageType): void;
}

export class Logger implements ILog {
    log(message, type) {
        if (type === messageType.ERROR) {
            console.error(message);
        } else {
            console.log(message);
        }
    }
}

// по умолчанию .log
// но можно переопределить

export class HTMLLogger extends Logger {
    private _HTMLNode;

    constructor() {
        super();
        this._HTMLNode = document.querySelector('.log');
    }

    set HTMLNode(value) {
        // check value  not empty
        this._HTMLNode = value;
    }

   log(message, type) {
        super.log(message, type);
        if (this._HTMLNode) {
            this._HTMLNode.innerHTML += `${message} <br>`;
        }
    }
}
