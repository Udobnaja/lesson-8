import {HTMLLogger, messageType} from "../log/index";
import {Observer} from "../../observer/index";
export class View extends HTMLLogger implements Observer {

    private template;

    constructor(private node, private _observable){
        super();
        this.node = node;
        this._observable = _observable;
        this._observable.registerObserver(this);

    }

    private _render(state){
        this.node.innerHTML = this.template;
        // Не живой пример - проходимся только по узлам первой вложенности
        for (let node of this.node.childNodes){
           // можно потом сохранять ключи и сравнивать изменились они или нет и если изменились делать рендер
           const key = node.dataset.bind;

           if (key !== undefined){
               this.log('RENDER VIEW', messageType.INFO);
               node.innerText = state[key];
           }
        }
    }

    public render(callback){
        this.template = callback();
        this._render(this._observable.getValue());


    }

    update(state){
        this._render(state);
    }
}