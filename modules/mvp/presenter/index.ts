import {Model} from "../model/index";
import {IView} from "../view/index";

export class Presenter{
    private _view: IView;
    private _model: Model;

    constructor(view:IView) {
        this._view = view;
        this._model = new Model();

        this._update({data: 'Здесь появится ответ сервера'});
    }

    click(){
        let data = this._model.sendToServer('Хочу что то послать ');
        this._update(data);
    }

    private _update(data){
        this._model.update(data);
        this._view.node.querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме
    }
}


// взаимодествие между моделью и представлением