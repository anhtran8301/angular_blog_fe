import { Component } from '@angular/core';
import { ChangeAvatar } from 'src/app/models/ChangeAvatar';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent {
  form: any = {};
  changeAvatar!: ChangeAvatar;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toast: ToastrService,
    private router: Router
    ) {
  }

  onUpload($event: string) {
    this.form.avatar = $event;
  }

  updateAvatar() {
    this.changeAvatar = new ChangeAvatar(
      this.form.avatar
    )
    this.authService.editAvatar(this.changeAvatar).subscribe(data => {
      // console.log(data);
      this.tokenService.setAvatar(this.form.avatar);
      this.toast.success(data.message);
      this.router.navigate(['']);
    })
  }

}
