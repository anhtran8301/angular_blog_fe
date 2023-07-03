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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
      // console.log("hasCategory,", hasCategory);
      if(hasCategory) {
        this.currentBookCategoryId = Number(this.route.snapshot.paramMap.get('id'));
        this.getProductsByBookCategory();
      } else {
        this.getAllProducts();
      }
    })
  }

  getProductsByBookCategory() {
    this.productService.getProductsByBookCategory(this.currentBookCategoryId).subscribe(data => {
      this.products = data;
    })
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.content;
    })
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
