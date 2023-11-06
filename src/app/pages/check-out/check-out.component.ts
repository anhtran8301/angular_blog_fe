import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { UserAddress } from 'src/app/models/UserAddress';
import { CartService } from 'src/app/service/cart.service';
import { UserAddressService } from 'src/app/service/user-address.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  products: Product[] = [];
  userAddresses!: UserAddress;
  
  constructor(private userAddressService: UserAddressService) {

  }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress() {
    this.userAddressService.getUserAddress().subscribe(data => {
      this.userAddresses = data;
      console.log(this.userAddresses)
    })
  }
  
}
