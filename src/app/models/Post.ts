export class Post {
    public title: string;
    public description: string;
    public content: string;
    public categoryId: string;

    constructor(title: string, description: string, content: string, categoryId: string) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.categoryId = categoryId;
    }
}
