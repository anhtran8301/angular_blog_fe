import { Product } from "./Product";

export class CartItem {
    id: number;
    name: string;
    imagesString: string;
    unitPrice: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imagesString = product.imagesString;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}