import {Dispatcher} from "../../modules/flux/dispatcher/index";
import {DATA_TYPE} from "../actions/data";

const dispatcher = new Dispatcher();
const TIMEOUT = 800;

const sendToServer = async (data) => {
    // Выполняется какая то асинхронная операция

    let id = await setTimeout(() => {
        dispatcher.dispatch({type: DATA_TYPE.SEND_SUCCESS, payload: (data) ? data : 'YOU SEND EMPTY DATA'});
        clearTimeout(id);
    }, TIMEOUT);
};

export { sendToServer }