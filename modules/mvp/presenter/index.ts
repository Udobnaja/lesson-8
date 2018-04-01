import {Model} from "../model/index";
import {IView} from "../view/index";
import {HTMLLogger, messageType} from "../../log/index";

export class Presenter extends HTMLLogger{
    private _view: IView;
    private _model: Model;

    constructor(view:IView) {
        super();
        this._view = view;
        this.HTMLNode = this._view.node.querySelector('.log');
        this._model = new Model();

        this._update({data: 'Здесь появится ответ сервера', currentData: ''});
    }

    click(){
        this.log('PRESENTER CLICK INVOKE', messageType.INFO);
        let data = this._model.sendToServer(this._view.node.querySelector('input').value);
        this._update(data);
    }

    keyup(){
        this.log('PRESENTER KEYUP INVOKE', messageType.INFO);
        let data = {currentData: this._view.node.querySelector('input').value};
        this._update(data);
    }

    private _update(data){
        this.log('PRESENTER UPDATE DATA IN VIEW AND MODEL', messageType.INFO);
        this._model.update(data);

        if (data.data){
            this._view.node.querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме
        }
    }

}


// взаимодествие между моделью и представлением