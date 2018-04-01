import { View } from '../../../../modules/mvp/view/index';
import { messageType } from '../../../../modules/log/index';
export class MVPView extends View{

    click(){
        this.log('VIEW ИНИЦИАЛИЗИРОВАЛО CLICK ПО BUTTON', messageType.INFO);
        console.log(this.presenter);
        this.presenter.click();
    }

    keyup(){
        this.log('VIEW ИНИЦИАЛИЗИРОВАЛО СОБЫТИЕ KEY_UP ПО INPUT', messageType.INFO);
        this.presenter.keyup();
    }
}
