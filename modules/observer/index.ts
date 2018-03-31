export interface Observer {
    update (arg:any);
}

export class Observable {
    private observers : Observer [];
    private _value;

    constructor(value) {
        this._value = value;
        this.observers = [];
    }


    public next(value){
        this._value = value;
        this.notifyObservers(value);
    }

    public getValue(){
        return this._value;
    }

    public registerObserver (observer : Observer) : void {
        this.observers.push(observer);
    }

    public removeObserver (observer : Observer) : void {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    private notifyObservers (arg : any) : void {
        this.observers.forEach((observer : Observer)=> {
            observer.update(arg);
        });
    }
}