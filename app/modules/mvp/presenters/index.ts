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
        this.changeDisableState({isDisabled: true});

        this._model['sendToServer'](this._view.node.querySelector('input').value)
            .then((resp) => {
                this.log('PRESENTER SAYS: SERVER RESPOND WITH SUCCESS', messageType.INFO);
                this.state = {data: (resp) ? resp : 'YOU SEND EMPTY DATA'};
                this.changeDisableState({isDisabled: false});
                this.renderLabel(this.state);
            }).catch((e) => {
                this.changeDisableState({isDisabled: false});
                this.log('PRESENTER SAYS: SERVER RESPOND WITH ERROR', messageType.ERROR);
            });
    }

    keyup(){
        this.log('PRESENTER KEYUP INVOKE', messageType.INFO);
        this.state = { currentData: this._view.node.querySelector('input').value };
    }

    renderLabel(data){
        if (data.data){
            this._view.node
                .querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме

            this.log('PRESENTER UPDATE VIEW', messageType.INFO);
        }
    }

    changeDisableState({isDisabled}){
        // повторяюсь =(
        this._view.node
            .querySelector('.view-stub__input').disabled = isDisabled;
        this._view.node
            .querySelector('.view-stub__apply').disabled = isDisabled;
    }
}
