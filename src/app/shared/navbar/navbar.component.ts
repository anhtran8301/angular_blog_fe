import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name = '';
  avatar = '';
  isLogin = false;
  isAdmin = false;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.isLogin = true;
      this.tokenService.getRole().forEach(role => {
        if (JSON.stringify(role) === JSON.stringify('ROLE_ADMIN')) {
          this.isAdmin = true;
        }
      })
    }
  }

  logOut() {
    this.isLogin = false;
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("something change->>", changes)
  }
}
