export class View{
    constructor(private node, private observable){
        this.node = node;
        this.observable = observable;
    }

    public render(key){
        this.observable.subscribe((e) => {
            if (e[key] !== undefined){
                this.node.innerHTML = e[key];
            }
        })
    }
}