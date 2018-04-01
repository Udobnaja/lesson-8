import { Presenter } from '../../../../modules/mvp/presenter/index';
import { messageType } from '../../../../modules/log/index';
export class MVPPresenter extends Presenter{
    constructor(view, ModelClass){
        super(view);
        this._model = new ModelClass();
        this._update({ data: 'Здесь появится ответ сервера', currentData: '' });
    }

    click(){
        this.log('PRESENTER CLICK INVOKE', messageType.INFO);
        const data = this._model['sendToServer'](this._view.node.querySelector('input').value);
        this._update(data);
    }

    keyup(){
        this.log('PRESENTER KEYUP INVOKE', messageType.INFO);
        const data = { currentData: this._view.node.querySelector('input').value };
        this._update(data);
    }

    protected _update(data){

     super._update(data);

        this.log('PRESENTER UPDATE DATA IN VIEW AND MODEL' , messageType.INFO);

     if (data.data){
         this._view.node
             .querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме
     }
    }
}
