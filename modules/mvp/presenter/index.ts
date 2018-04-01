import { Model } from '../model/index';
import { IView } from '../view/index';
import { HTMLLogger, messageType } from '../../log/index';

export class Presenter extends HTMLLogger{
    private _view: IView;
    private _model: Model;

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

    get view(): IView {
        return this._view;
    }

    get model(): Model {
        return this._model;
    }

    public init(){}

    public provide(modelClass){
        this._model = new modelClass();
    }

    protected _update(data){
        this._model.state = data;
        this.log(`PRESENTER: ОБНОВИЛ ДАННЫЕ MODEL ${Object.keys(data)}` , messageType.INFO);
    }

}
// взаимодествие между моделью и представлением
