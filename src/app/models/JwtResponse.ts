export class JwtResponseModel {
    public id: string;
    public name: string;
    public avatar: string;
    public token: string;
    public roles: string[];

    constructor(id:string, name: string, avatar: string, token: string, roles: string[]) {
        this.id = id
        this.name = name;
        this.avatar = avatar;
        this.token = token;
        this.roles = roles;
    }

}