import { Model } from '../model/index';
import { IView } from '../view/index';
import { HTMLLogger } from '../../log/index';

export class Presenter extends HTMLLogger{
    protected _view: IView;
    protected _model: Model;

    constructor(view: IView) {
        super();
        this._view = view;
        this.HTMLNode = this._view.node.querySelector('.log');
        this._model = new Model();
    }

    protected _update(data){
        this._model.update(data);
    }

}
// взаимодествие между моделью и представлением
