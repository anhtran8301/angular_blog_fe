import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/models/Register';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
  registerModel!: RegisterModel;

  emailFormValidate = new FormControl('', [
    Validators.required,
    Validators.email,

  ]);


  constructor(
    private authService: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.registerModel = new RegisterModel(
      this.registerForm.name,
      this.registerForm.username,
      this.registerForm.email,
      this.registerForm.password,
    );
    console.log(this.registerForm);
    this.authService.register(this.registerModel).subscribe(data => {
      console.log(data);
      this.toast.success(data.message)
      // this.status = data.message;

    }, errorResponse => {
      console.log(errorResponse.status);

      // console.log(errorResponse.error);
      this.toast.error(errorResponse.error.message)
      // this.status = errorResponse.error.message;

    });

  }

}
