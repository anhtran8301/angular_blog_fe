import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/models/Register';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordRegex = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$";
  hide = true;
  // status = ""
  registerForm: any = {};
  registerModel!: Register;

  emailFormValidate = new FormControl('', [
    Validators.required,
    Validators.email,

  ]);

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.registerModel = new Register(
      this.registerForm.name,
      this.registerForm.username,
      this.registerForm.email,
      this.registerForm.password,
      this.registerForm.phone,
    );
    // console.log(this.registerForm);
    this.authService.register(this.registerModel).subscribe(data => {
      // console.log(data);
      // this.toast.success(data.message);
      this.authService.setCheckRegister(true);
      this.router.navigate(['login']);
    }, errorResponse => {
      // console.log(errorResponse.status);
      this.toast.error(errorResponse.error.message)
    });

  }

}
