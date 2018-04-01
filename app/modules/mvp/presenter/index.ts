import { Presenter } from '../../../../modules/mvp/presenter/index';
import { messageType } from '../../../../modules/log/index';
export class MVPPresenter extends Presenter{
    // мне не нравится каждый раз вызвать супер
    constructor(view, ModelClass){
        super(view);
        this._model = new ModelClass();
    }

    // Вообще не хорошо что я тут имею доступ к приватным и протектед пропертям

    init(){
        this.state = { data: 'Здесь появится ответ сервера', currentData: '' };
        this.renderLabel(this.state);
    }

    click(){
        this.log('PRESENTER CLICK INVOKE', messageType.INFO);

        this._model['sendToServer'](this._view.node.querySelector('input').value)
            .then((resp) => {
                this.log('PRESENTER SAYS: SERVER RESPOND WITH SUCCESS', messageType.INFO);

                const data = {data: resp};
                this._update(data);
                this.renderLabel(data);
            }).catch((e) => {
                this.log('PRESENTER SAYS: SERVER RESPOND WITH ERROR', messageType.ERROR);
            });
    }

    keyup(){
        this.log('PRESENTER KEYUP INVOKE', messageType.INFO);
        const data = { currentData: this._view.node.querySelector('input').value };
        this._update(data);
    }

    renderLabel(data){
        if (data.data){
            this._view.node
                .querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме

            this.log('PRESENTER UPDATE VIEW', messageType.INFO);
        }
    }
}
