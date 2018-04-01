import { Model } from '../../../../modules/mvp/model/index';
import { messageType } from '../../../../modules/log/index';
import { sendToServer } from '../../../services/data';
export class MVPModel extends Model{
    sendToServer(data){
        this.log('MODEL: ОТПРАВИЛА НА СЕРВЕР ДАННЫЕ: ' + data, messageType.INFO);
        return sendToServer(data);
    }
}
