import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { MessengerService } from 'src/app/service/messenger.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {
  // totalPrice: number = 0.00;
  // totalQuantity: number = 0;


  // constructor(
  //   private cartService: CartService,
  //   private changeDetectorRefs: ChangeDetectorRef
  //   ) { }

  // ngOnInit(): void {
  //   this.initCarts();
  //   // this.updateCartStatus();
  // }

  // updateCartStatus() {
  //   this.cartService.totalPrice.subscribe(
  //     data => {
  //       this.totalPrice = data;
  //       console.log(this.totalPrice);

  //     }
  //   );

  //   this.cartService.totalQuantity.subscribe(
  //     data => {
  //       this.totalQuantity += data;
  //       console.log(this.totalQuantity);
  //     }
  //   );
  // }

  // initCarts() {
  //   this.cartService.getCarts().subscribe(data => {
  //     this.totalQuantity = data.reduce((total: number, product: Product) => total + product.quantity, 0);
  //     console.log(this.totalQuantity);
  //     this.changeDetectorRefs.detectChanges();
  //   })
  // }

  cartItems: CartItem[] = [];

  cartTotal = 0;
  cartQuantity = 0;

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.calcCartTotal();
    })
  }

  calcCartTotal() {
    this.cartTotal = 0;
    this.cartQuantity = 0;
    this.cartItems.forEach(item => {

      this.cartTotal += (item.quantity * item.unitPrice)
      this.cartQuantity += item.quantity
    })
  }

}
