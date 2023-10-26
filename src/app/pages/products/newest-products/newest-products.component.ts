import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newest-products',
  templateUrl: './newest-products.component.html',
  styleUrls: ['./newest-products.component.scss']
})
export class NewestComponent implements OnInit {
  added: boolean = false;

  products: Product[] = [];
  currentBookCategoryId: any;
  prevBookCategoryId: any;
  currentAuthorId: any;
  prevAuthorId: any;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 4;
  totalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.prevBookCategoryId != this.currentBookCategoryId) {
      this.pageNumber = 1;
    }
    if (this.prevAuthorId != this.currentAuthorId) {
      this.pageNumber = 1;
    }
    this.route.params.subscribe(params => {
      this.currentBookCategoryId = +params['categoryId'];
      this.currentAuthorId = +params['authorId'];
      this.listProduct();
    });
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  getNewestProducts() {
    this.productService.getNewestProducts(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
  }

  getProductsByBookCategory() {
    this.productService.getProductsByBookCategory(this.currentBookCategoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
      console.log("getProductsByCate")
  }

  getProductsByAuthor() {
    this.productService.getProductsByAuthor(this.currentAuthorId, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
      console.log("getProductsByAuthor");
      
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if have a different keyword than previous
    //then set the page number to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;
    // console.log("keyword: " + keyword);
    // console.log("pageNumber: " + this.pageNumber);

    this.productService.searchProducts(keyword, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
  }

  handleListProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('/categories/id');
    this.prevBookCategoryId = this.currentBookCategoryId;
  
    const hasAuthor: boolean = this.route.snapshot.paramMap.has('/authors/id');
    this.prevAuthorId = this.currentAuthorId;
  
    if (this.currentBookCategoryId) {
      this.getProductsByBookCategory();
    } else if (this.currentAuthorId) {
      this.getProductsByAuthor();
    } else {
      this.getNewestProducts();
    }
  }
  
  processResult() {
    return (data: any) => {
      this.products = data.content;
      console.log(this.products);

      this.pageNumber = data.pageNo + 1;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    }
  }

  addToCart(product: Product) {
    this.toggleDone();
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
  updatePageSize(pageSize: string) {
    this.pageSize = Number(pageSize);
    this.pageNumber = 1;
    this.listProduct();
  }

  toggleDone(): void {
    // const doneElement = document.querySelector(".done") as HTMLElement;
    this.toastService.success('Thêm vào giỏ hàng thành công')
  }



}
