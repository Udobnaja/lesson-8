import {Presenter} from "../presenter/index";
import {HTMLLogger, messageType} from "../../log/index";

export interface IView{
    node;
    click():void
}

export class View extends HTMLLogger{
    private _presenter; // (IPresenter)
    public node;

    constructor(node){
        super();
        this.node = node;
        this.HTMLNode = this.node.querySelector('.log');
        this.log('VIEW WAS CREATED', messageType.INFO);
        this._presenter = new Presenter(this); // decorator
    }

    click(){
        this.log('VIEW CLICK ON BUTTON', messageType.INFO);
        this._presenter.click();
    }
}

// реализует отображение данных из модели, обращаясь к презентер за обновлениями
