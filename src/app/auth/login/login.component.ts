import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordRegex = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$";
  hide = true;
  loginForm: any = {};
  loginModel!: Login

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toast: ToastrService,
    private router: Router,
    private cartService: CartService

  ) { }

  ngOnInit() {
    this.checkCart();
    if (this.authService.getCheckRegister()) {
      this.toast.success("Đăng kí thành công!");
    }
  }

  login() {
    this.loginModel = new Login(
      this.loginForm.usernameOrEmail,
      this.loginForm.password
    )
    this.authService.login(this.loginModel).subscribe(data => {
      // console.log(data);
      //@ts-ignore
      this.tokenService.setName(data.user.name);
      //@ts-ignore
      this.tokenService.setAvatar(data.user.avatar);
      //@ts-ignore
      this.tokenService.setToken(data.accessToken);
      //@ts-ignore
      this.tokenService.setRole(data.user.roles);
      this.tokenService.isAdmin(this.tokenService.getRole())
        ? this.router.navigate(['admin'])
        : this.router.navigate([''])
      
    }, errorResponse => {
      this.toast.error(errorResponse.error.message, "Đăng nhập thất bại !!!")
    })
  }

  checkCart() {
    const cartItems = this.cartService.cartItems;
    // console.log("cartItems: " + cartItems.)
  }

}