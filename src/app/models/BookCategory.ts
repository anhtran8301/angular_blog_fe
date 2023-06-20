export class BookCategory {
    private name: string;
    private description: string;
    public image: string;

    constructor(name: string, description: string, image: string,) {
        this.name = name;
        this.description = description;
        this.image = image
    }
}