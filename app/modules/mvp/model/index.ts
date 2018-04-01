import { Model } from '../../../../modules/mvp/model/index';
import { messageType } from '../../../../modules/log/index';
import {sendToServer} from "../../../services/data";
export class MVPModel extends Model{
    sendToServer(data){
        this.log('MODEL SEND DATA TO SERVER DATA: ' + data, messageType.INFO);
        return sendToServer(data);
    }
}
