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