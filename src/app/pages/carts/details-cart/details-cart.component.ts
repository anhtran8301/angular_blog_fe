import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { MessengerService } from 'src/app/service/messenger.service';
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

  cartTotal = 0;
  cartQuantity = 0;
  cartTotalDiscount = 0;

  constructor(
    private cartService: CartService,
    private tokenService: TokenService,
    private router: Router,
    private msg: MessengerService,
    private toast: ToastrService
  ) {
    this.listCartDetails();
  }

  ngOnInit(): void {
    this.handleSubscription();
    this.loadCartItems();
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

  handleRemove(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.productId).subscribe(() => {
      this.cartService.getCartItems().subscribe(data => {
        this.cartItems = data;
        this.msg.sendMsg(cartItem.productId)
      })
      this.toast.success("Xóa sản phẩm thành công")
    }, errorResponse => {
      this.toast.error(errorResponse.error.message)
    }
    );
  }

  checkOut() {
    if (this.tokenService.isLogin()) {
      this.router.navigate(['/check-out']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(data => {

      this.cartItems = data;
      console.log("cartItems", this.cartItems);
      this.calcCartTotal();
    })
  }

  calcCartTotal() {
    this.cartTotal = 0;
    this.cartQuantity = 0;
    this.cartTotalDiscount = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.quantity * item.unitPrice)
      this.cartQuantity += item.quantity
      this.cartTotalDiscount += (item.unitPrice - (item.unitPrice * item.discount / 100)) * item.quantity
    })
  }

  handleAddToCart(product: Product) {
      
      const cartItem = new CartItem(product.id, product, 1);
      this.cartService.addCart(cartItem.quantity, cartItem.id).subscribe(data => {
        this.msg.sendMsg(product.id)
      }, errorResponse => {
        this.toast.error(errorResponse.error.message)
      })

      // this.cartService.addToCart(cartItem);
  

  }


}
