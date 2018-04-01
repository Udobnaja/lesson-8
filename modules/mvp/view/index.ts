import {Presenter} from "../presenter/index";

export interface IView{
    node;
    click():void
}

export class View {
    private _presenter; // (IPresenter)
    public node;

    constructor(node){
        this.node = node;
        this._presenter = new Presenter(this); // decorator
    }

    click(){
        console.log('click in view');

        this._presenter.click();
    }
}

// реализует отображение данных из модели, обращаясь к презентер за обновлениями
