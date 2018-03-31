import {HTMLLogger, messageType} from "../log/index";
export class View extends HTMLLogger{
    constructor(private node, private observable){
        super();
        this.node = node;
        this.observable = observable;
    }

    public render(key){
        this.observable.subscribe((e) => {
            if (e[key] !== undefined){
                this.log('RENDER VIEW', messageType.INFO);
                this.node.innerHTML = e[key];
            }
        })
    }
}