import { Model } from '../../../../modules/mvp/model/index';
import { messageType } from '../../../../modules/log/index';
export class MVPModel extends Model{

    sendToServer(data){
        this.log('MODEL SEND DATA TO SERVER' + data, messageType.INFO);

        return { data };
    }
}
