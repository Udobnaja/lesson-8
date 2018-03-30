import {IAction} from "../action/index";

// сделать сингл тон
export class Dispatcher {
    private callbacks;
    private id;

    constructor() {

        // тут может быть можно плясать от observable
        // можно добавлять id типа что то hash походу
        this.id = 0;

        this.callbacks = new Map(); //{}
    }
    // до того прининимал type и callback как при стандартном медиаторе, но пока не понимаю как таскать из Store
    // type при регистрации в сторе
    register(callback:Function) {


        // if (!this.callbacks.has(type)){
        //     this.callbacks.set(type, []);
        // }
        //
        // this.callbacks.get(type).push(callback);

        this.callbacks.set(this.id, callback);
        this.id++;
        /* возвращать id е доплюсованное*/
    }

    // заменила с on на dispatch по феншую
    // как потом забирать колбеки не по типу а по id доставать и обрабатывать?
    dispatch(action: IAction<any>) {  // sorry for any
       this.callbacks.forEach((id) => {
           // id func - который исполняется
            id(action);
        });

        // if (this.callbacks.has(action.type)){
        //     this.callbacks.get(action.type).forEach((callback) => {
        //         callback(action.payload);
        //     });
        // } else {
        //     throw new Error('not registered action');
        // }
    }

    unregister(){
        // удаляшки id
    }
}