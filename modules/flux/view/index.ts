import { HTMLLogger, messageType } from '../../log/index';
import { IObserver, Observable } from '../../observer/index';
const TYPE = 'VIEW';
export class View extends HTMLLogger implements IObserver {

    private _template;
    private _keys = {};

    constructor(private _node, private _observable: Observable) {
        super();
        this._node = _node;
        this._observable = _observable;
        this._observable.registerObserver(this);

    }

    private _render(state) {
        // Не живой пример - проходимся только по узлам первой вложенности
        for (const node of this._node.childNodes) {
           // сохраняем ключи и сравниваем изменились они или нет и если изменились делать рендер
           const key = node.dataset.bind;

           if (key !== undefined) {
               if (this._keys[key] === undefined || state[key] !== this._keys[key]) {
                   this.log(`${TYPE} RENDER`, messageType.INFO);
                   node.innerText = state[key];
                   this._keys[key] = state[key];
               }
           }
        }
    }

    public render(callback) {
        this._template = callback();
        this._node.innerHTML = this._template;
        this._render(this._observable.getValue());
    }

    update(state) {
        this._render(state);
    }
}
