import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/CartItem';
import { CheckOutForm } from 'src/app/models/CheckOutForm';
import { UserAddress } from 'src/app/models/UserAddress';
import { CartService } from 'src/app/service/cart.service';
import { CheckOutService } from 'src/app/service/checkout.service';
import { UserAddressService } from 'src/app/service/user-address.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  payModel = '';
  shipNote = '';
  deliveryFee = 0;

  userAddresses!: UserAddress;
  cartItems: CartItem[] = [];
  
  cartTotal = 0;
  cartQuantity = 0;
  cartTotalDiscount = 0;

  constructor(
    private userAddressService: UserAddressService,
    private cartService: CartService,
    private checkOutService: CheckOutService,
    private toast: ToastrService,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
    this.getUserAddress();
    this.loadCartItems();
  }

  getUserAddress() {
    this.userAddressService.getUserAddress().subscribe(data => {
      this.userAddresses = data;
      console.log(this.userAddresses)
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

  checkOut() {
    const checkOutForm = new CheckOutForm(
      this.cartItems.map(item => item.id),
      this.shipNote,
      this.userAddresses.id,
      this.payModel,
      this.deliveryFee
    );
    console.log("checkoutform",checkOutForm);
    
    this.checkOutService.checkOut(checkOutForm).subscribe(
      data => {
        window.open(data.message, '_blank');
        console.log(data);
        
        this.toast.success('Đã đặt hàng thành công:');
        this.cartItems = [];
      },
      error => {
        // Xử lý lỗi nếu có
        this.toast.error('Lỗi khi đặt hàng:');
      }
    );
  }

  
}
