export class UserAddress {
    constructor(
        public id: number,
        public address: string,
        public province: number,
        public district: number,
        public ward: number,
        public phone: string,
        public receiver: string,
        public displayAddress: string,
    ) { }
}
