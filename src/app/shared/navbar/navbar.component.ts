import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BookCategoryService } from 'src/app/service/book-category.service';
import { BookCategory } from 'src/app/models/BookCategory';
import { AuthorService } from 'src/app/service/author.service';
import { Author } from 'src/app/models/Author';
import { Publisher } from 'src/app/models/Publisher';
import { PublisherService } from 'src/app/service/publisher.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  listBooksCategories: BookCategory[] = [];
  listAuthors: Author[] = [];
  listPublishers: Publisher[] = [];

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
    private bookCategoryService: BookCategoryService,
    private publisherService: PublisherService,
    private authorService: AuthorService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.getAllBooksCategories();
    this.getAllAuthors();
    this.getAllPublishers();
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.checkLogin();
      }
    })

  }

  checkLogin() {
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

  getAllAuthors() {
    this.authorService.getAll().subscribe(data => {
      this.listAuthors = data;
    })
  }

  getAllPublishers() {
    this.publisherService.getAll().subscribe(data => {
      this.listPublishers = data;
    })
  }

   
}
