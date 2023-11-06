export class CheckOutForm {
    constructor(
        public checkedCartId: number[],
        public shipNote: string,
        public userAddressId: number,
        public payType: string,
        public deliveryFee: number,
    ) { }
}
