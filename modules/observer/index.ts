export interface IObserver {
    update(arg: any);
}

export class Observable {
    private _observers : IObserver [];
    private _value;

    constructor(value) {
        this._value = value;
        this._observers = [];
    }


    public next(value) {
        this._value = value;
        this._notifyObservers(value);
    }

    public getValue() {
        return this._value;
    }

    public registerObserver (observer : IObserver) : void {
        this._observers.push(observer);
    }

    public removeObserver (observer : IObserver) : void {
        this._observers.splice(this._observers.indexOf(observer), 1);
    }

    private _notifyObservers (arg : any) : void {
        this._observers.forEach((observer : IObserver) => {
            observer.update(arg);
        });
    }
}
