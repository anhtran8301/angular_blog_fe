import { Product } from "./Product";

export class CartItem {
    id: number;
    name: string;
    imagesString: string;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;

    constructor(id: number, product: Product, quantity: number) {
        this.id = id;
        this.name = product.name;
        this.imagesString = product.imagesString;
        this.unitPrice = product.unitPrice;
        this.discount = product.discount;
        this.quantity = quantity;
        this.productId = product.id;
    }
}