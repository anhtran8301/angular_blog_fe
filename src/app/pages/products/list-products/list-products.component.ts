import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ProductsListComponent implements OnInit {
  added: boolean = false;

  products: Product[] = [];
  currentBookCategoryId: any;
  prevBookCategoryId: any;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.prevBookCategoryId != this.currentBookCategoryId) {
      this.pageNumber = 1;
    }
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
  }

  listProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  getProductsByBookCategory() {
    this.productService.getProductsByBookCategory(this.currentBookCategoryId, this.pageNumber - 1, this.pageSize).subscribe(data => {
      this.pageNumber = data.pageNo + 1;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
      this.products = data.content;
    })
  }

  getAllProducts() {
    this.productService.getProductsPaginate(this.pageNumber - 1, this.pageSize).subscribe(data => {
      this.pageNumber = data.pageNo + 1;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
      this.products = data.content;
    })
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(keyword).subscribe(data => {
      this.products = data;
    })
  }

  handleListProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
    this.prevBookCategoryId = this.currentBookCategoryId;

    if (hasCategory) {
      this.currentBookCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      this.getProductsByBookCategory();
    } else {
      this.getAllProducts();
    }

  }

  toggleDone(): void {
    const doneElement = document.querySelector(".done") as HTMLElement;
    
    if (this.added) {
      doneElement.style.transform = "translate(-110%) skew(-40deg)";
      this.added = false;
    } else {
      doneElement.style.transform = "translate(0px)";
      this.added = true;
    }
  }


}
