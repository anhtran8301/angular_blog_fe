import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    //check if already have the item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      //check if found it
      alreadyExistsInCart = (existingCartItem != undefined);

    }
    //add the item to the array
    alreadyExistsInCart ? existingCartItem.quantity++ : this.cartItems.push(cartItem);

    //compute cart total price and total quantity
    this.computeCartTotals();

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    cartItem.quantity === 0 ? this.remove(cartItem) : this.computeCartTotals();
    
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);

    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log("name", tempCartItem.name, "quantity", tempCartItem.quantity, "unitPrice", tempCartItem.unitPrice, "subTotalPrice", subTotalPrice);

    }

    console.log("totalPriceValue", totalPriceValue.toFixed(2), "totalQuantityValue", totalQuantityValue);
    console.log("-----");
    
  }
}
