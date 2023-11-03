import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_CART = `${environment.API_LOCAL}/carts`;

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();
  
  

  constructor(private httpClient: HttpClient) { }

  // addToCart(cartItem: CartItem) {
  //   //check if already have the item in cart
  //   let alreadyExistsInCart: boolean = false;
  //   let existingCartItem: CartItem = undefined!;

  //   if (this.cartItems.length > 0) {
  //     //find the item in the cart based on item id
  //     for (let tempCartItem of this.cartItems) {
  //       if (tempCartItem.id === cartItem.id) {
  //         existingCartItem = tempCartItem;
  //         break;
  //       }
  //     }

  //     //check if found it
  //     alreadyExistsInCart = (existingCartItem != undefined);

  //   }
  //   //add the item to the array
  //   alreadyExistsInCart ? existingCartItem.quantity++ : this.cartItems.push(cartItem);

  //   //compute cart total price and total quantity
  //   this.computeCartTotals();

  // }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    cartItem.quantity === 0 ? this.remove(cartItem) : this.computeCartTotals();
    
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * (currentCartItem.unitPrice - (currentCartItem.unitPrice * currentCartItem.discount / 100));
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // this.logCartData(totalPriceValue, totalQuantityValue);
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

    // console.log("totalPriceValue", totalPriceValue.toFixed(2), "totalQuantityValue", totalQuantityValue);
    // console.log("-----");
    
  }

  getCartItems(): Observable<CartItem[]> {
    //TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
    return this.httpClient.get<CartItem[]>(this.API_CART).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        for (let item of result) {
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].quantity++
              console.log(i);
              
              productExists = true
              break;
            }
          }

          if (!productExists) {
            cartItems.push(new CartItem(item.id, item.product, item.quantity));
          }
        }
        console.log("cartItems: ", cartItems);
        
        return cartItems;
      })
    );
  }

  addCart(quantity: number, productId: number): Observable<any> {
    return this.httpClient.post<any>(this.API_CART, {quantity, productId})
  }

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

    addProductToCart(product: Product): Observable<any> {
      return this.httpClient.post(this.API_CART, { product });
    }
}
