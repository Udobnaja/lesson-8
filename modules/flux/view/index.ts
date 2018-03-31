import {HTMLLogger, messageType} from "../../log/index";
import {Observer} from "../../observer/index";
export class View extends HTMLLogger implements Observer {

    private template;
    private keys = {};

    constructor(private node, private _observable){
        super();
        this.node = node;
        this._observable = _observable;
        this._observable.registerObserver(this);

    }

    private _render(state){
        // Не живой пример - проходимся только по узлам первой вложенности
        for (let node of this.node.childNodes){
           // сохраняем ключи и сравниваем изменились они или нет и если изменились делать рендер
           const key = node.dataset.bind;

           if (key !== undefined){
               if (this.keys[key] === undefined || state[key] !== this.keys[key]){
                   this.log('RENDER VIEW', messageType.INFO);
                   node.innerText = state[key];
                   this.keys[key] = state[key];
               }
           }
        }
    }

    public render(callback){
        this.template = callback();
        this.node.innerHTML = this.template;
        this._render(this._observable.getValue());
    }

    update(state){
        this._render(state);
    }
}