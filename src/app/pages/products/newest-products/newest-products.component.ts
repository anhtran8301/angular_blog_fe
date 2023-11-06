import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { MessengerService } from 'src/app/service/messenger.service';

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

  currentPublisherId: any;
  prevPublisherId: any;

  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 4;
  totalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private msg: MessengerService,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    // this.getCarts();
    if (this.prevBookCategoryId != this.currentBookCategoryId) {
      this.pageNumber = 1;
    }
    if (this.prevAuthorId != this.currentAuthorId) {
      this.pageNumber = 1;
    }
    if (this.prevPublisherId != this.currentPublisherId) {
      this.pageNumber = 1;
    }
    this.route.params.subscribe(params => {
      this.currentBookCategoryId = +params['categoryId'];
      this.currentPublisherId = +params['publisherId'];
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
  }

  getProductsByAuthor() {
    this.productService.getProductsByAuthor(this.currentAuthorId, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
  }

  getProductsByPublisher() {
    this.productService.getProductsByPublisher(this.currentPublisherId, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult())
  }

  // getCarts() {
  //   this.cartService.getCarts().subscribe(data => {
  //     console.log(data)
  //   }, errorResponse => {
  //     this.toast.error(errorResponse.error.message)
  //   })
  // }

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
    // const hasCategory: boolean = this.route.snapshot.paramMap.has('/categories/id');
    // this.prevBookCategoryId = this.currentBookCategoryId;

    // const hasAuthor: boolean = this.route.snapshot.paramMap.has('/authors/id');
    // this.prevAuthorId = this.currentAuthorId;

    if (this.currentBookCategoryId) {
      this.getProductsByBookCategory();
    }
    else if (this.currentAuthorId) {
      this.getProductsByAuthor();

    }
    else if (this.currentPublisherId) {
      this.getProductsByPublisher();
    }
    else {
      this.getNewestProducts();
    }
  }

  processResult() {
    return (data: any) => {
      this.products = data.content;

      this.pageNumber = data.pageNo + 1;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    }
  }

  handleAddToCart(product: Product) {
    if (this.tokenService.isLogin()) {
      
      const cartItem = new CartItem(product.id, product, 1);
      this.cartService.addCart(cartItem.quantity, cartItem.id).subscribe(data => {
        console.log(data);
        this.msg.sendMsg(product.id)
        this.toggleDone();
      }, errorResponse => {
        this.toast.error(errorResponse.error.message)
      })

      // this.cartService.addToCart(cartItem);
    } else {
      this.router.navigate(['/login']);
    }

  }


  updatePageSize(pageSize: string) {
    this.pageSize = Number(pageSize);
    this.pageNumber = 1;
    this.listProduct();
  }

  toggleDone(): void {
    // const doneElement = document.querySelector(".done") as HTMLElement;
    this.toast.success('Thêm vào giỏ hàng thành công')
  }

  // handleAddToCart(productItem: Product) {
  //   this.cartService.addProductToCart(productItem).subscribe((data) => {
  //     console.log("111111111" + productItem);
      
  //     this.msg.sendMsg(productItem)
  //     this.products = data.content
  //   })
  // }

}
