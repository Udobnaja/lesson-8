import { Dispatcher } from '../dispatcher/index';
import { messageType, HTMLLogger } from '../../log/index';
import { Observable } from '../../observer/index';

const TYPE = 'STORE';

export class Store extends HTMLLogger {

    private constructor() {
        super();

        Store._state = new Observable({});
        this.state$ = Store._state;

        if (Store._instance) {
            throw new Error('only one Store is Allowed');
        }
    }

    protected static _instance: Store = new Store;
    protected static dispatcher: Dispatcher;

    protected static _state: Observable;
    public state$: Observable;

    public static createStore({
        dispatcher,
        state,
        callbacks,
    }) {
        Store._instance.log(`${TYPE}: БЫЛ СОЗДАН`, messageType.INFO);
        Store.dispatcher = dispatcher;

        for (const key in callbacks) {
            this.dispatcher.register(key, callbacks[key]);
        }

        Store._state.next(state);

        return this._instance;
    }

    get state() {
        return Store._state.getValue();
    }

    changeEvent(payload) {
        const keys = Object.keys(payload);
        const log = (keys.length) ?
            `${TYPE}: ИЗМЕНИЛ ЗНАЧЕНИЯ ' ${keys} ' КЛЮЧА/КЛЮЧЕЙ` :
            `${TYPE}: ПРОИЗОШЛО СОБЫТИЕ CHANGE EVENT, НО ЗФНДЩФВ БЫЛ ПУСТОЙ`;
        this.log(log, messageType.INFO);
        if (keys.length) { // для того чтобы рендер выполнялся только при наличии payload
            Store._state.next(Object.assign(this.state, payload));
        }
    }
}

