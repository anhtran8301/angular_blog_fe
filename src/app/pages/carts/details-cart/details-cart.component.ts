import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-details-cart',
  templateUrl: './details-cart.component.html',
  styleUrls: ['./details-cart.component.scss']
})
export class DetailsCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isLogin: boolean = false;
  products: any;

  constructor(
    private cartService: CartService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.listCartDetails();
  }

  ngOnInit(): void { 
    // this.getCarts();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })

    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

  checkOut() {
    if (this.tokenService.isLogin()) {
      this.router.navigate(['/check-out']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // getCarts() {
  //   this.cartService.getCarts().subscribe(data => {
  //     this.products = data;
      
  //   })
  // }
}
