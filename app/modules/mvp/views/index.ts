import { View } from '../../../../modules/mvp/view/index';
import { messageType } from '../../../../modules/log/index';
export class MVPView extends View{

    click(){
        this.log('VIEW CLICK ON BUTTON', messageType.INFO);
        console.log(this.presenter);
        this.presenter.click();
    }

    keyup(){
        this.log('VIEW KEY UP ON INPUT', messageType.INFO);
        this.presenter.keyup();
    }
}
