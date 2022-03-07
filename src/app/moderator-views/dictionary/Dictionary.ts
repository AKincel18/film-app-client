export class Dictionary {
    id: number = -1;
    name: string = '';

    constructor() {
    }   

    public setFields(id: number, name: string) {
        this.id = id;
        this.name = name;
    }    
}