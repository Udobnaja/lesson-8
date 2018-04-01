import { Model } from '../model/index';
import { IView } from '../view/index';
import {HTMLLogger, messageType} from '../../log/index';

export class Presenter extends HTMLLogger{
    protected _view: IView;
    protected _model: Model;

    private _state;

    constructor(view: IView) {
        super();
        this._view = view;
        this.HTMLNode = this._view.node.querySelector('.log');
        this._model = new Model();

        this.init();
    }

    set state(state) {
        this._update(state);
    }

    get state(){
        return this._model.state;
    }

    public init(){

    }

    protected _update(data){
        this._model.state = data;
        this.log('PRESENTER UPDATE DATA MODEL' , messageType.INFO);
    }

}
// взаимодествие между моделью и представлением
