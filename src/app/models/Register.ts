export class Register {
    private name: string;
    private username: string;
    private email: string;
    private password: string;
    
    constructor(name: string, username: string, email: string, password: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}