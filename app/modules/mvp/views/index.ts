import { View } from '../../../../modules/mvp/view/index';
import { messageType } from '../../../../modules/log/index';
export class MVPView extends View{
    constructor(node, presenterClass, modelClass){
        super(node);
        this.presenter = new presenterClass(this, modelClass); // временное решение - здесь сеттера не должно быть
    }


    click(){
        this.log('VIEW CLICK ON BUTTON', messageType.INFO);
        this.presenter.click();
    }

    keyup(){
        this.log('VIEW KEY UP ON INPUT', messageType.INFO);
        this.presenter.keyup();
    }
}
