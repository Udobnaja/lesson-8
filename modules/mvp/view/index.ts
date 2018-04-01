import { HTMLLogger, messageType } from '../../log/index';
import { Presenter } from '../presenter/index';

export interface IView{
   node;
}

export class View extends HTMLLogger implements IView{
    protected _presenter; // (IPresenter)
    public node;

    constructor(node){
        super();
        this.node = node;
        this.HTMLNode = this.node.querySelector('.log');
        this.log('VIEW WAS CREATED', messageType.INFO);
        this._presenter = new Presenter(this); // decorator
    }
}

// реализует отображение данных из модели, обращаясь к презентер за обновлениями
