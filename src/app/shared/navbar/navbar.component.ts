import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BookCategoryService } from 'src/app/service/book-category.service';
import { BookCategory } from 'src/app/models/BookCategory';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  listBooksCategories: BookCategory[] = [];
  name = '';
  avatar = '';
  isLogin = false;
  isAdmin = false;
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService,
    private bookCategoryService: BookCategoryService) {
  }

  ngOnInit(): void {
    this.getAllBooksCategories();
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.checkLogin();
      }
    })
   
  }

  checkLogin(){
    if (this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.isLogin = true;
      this.tokenService.getRole().forEach(role => {
        if (JSON.stringify(role) === JSON.stringify('ROLE_ADMIN')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
    }
  }

  logOut() {
    this.isLogin = false;
    this.isAdmin = false;
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("something change->>", changes)
  }

  getAllBooksCategories() {
    this.bookCategoryService.getAll().subscribe(data => {
      this.listBooksCategories = data;
    })
  }
}
