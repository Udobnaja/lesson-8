import { View } from '../../../../modules/mvp/view/index';
import { messageType } from '../../../../modules/log/index';
export class MVPView extends View{
    constructor(node, presenterClass, modelClass){
        super(node);
        this._presenter = new presenterClass(this, modelClass);
    }


    click(){
        this.log('VIEW CLICK ON BUTTON', messageType.INFO);
        this._presenter.click();
    }

    keyup(){
        this.log('VIEW KEY UP ON INPUT', messageType.INFO);
        this._presenter.keyup();
    }
}
