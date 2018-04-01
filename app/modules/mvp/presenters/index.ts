import { Presenter } from '../../../../modules/mvp/presenter/index';
import { messageType } from '../../../../modules/log/index';
export class MVPPresenter extends Presenter{

    init(){
        this.state = { data: 'Здесь появится ответ сервера', currentData: '' };
        this.renderLabel(this.state);
    }

    click(){
        this.log('PRESENTER CLICK INVOKE', messageType.INFO);
        this.changeDisableState({isDisabled: true});

        this.model['sendToServer'](this.view.node.querySelector('input').value)
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
        this.state = { currentData: this.view.node.querySelector('input').value };
    }

    renderLabel(data){
        if (data.data){
            this.view.node
                .querySelector('.view-stub__label').innerText = data.data; // пока в тестовом режиме

            this.log('PRESENTER UPDATE VIEW', messageType.INFO);
        }
    }

    changeDisableState({isDisabled}){
        // повторяюсь =(
        this.view.node
            .querySelector('.view-stub__input').disabled = isDisabled;
        this.view.node
            .querySelector('.view-stub__apply').disabled = isDisabled;
    }
}
