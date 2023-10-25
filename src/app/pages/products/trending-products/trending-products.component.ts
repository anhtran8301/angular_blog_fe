
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss']
})
export class TrendingProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.getTrendingProducts();
  }

  getTrendingProducts(){
    this.productService.getTrendingProducts().subscribe(data => {
      console.log("trending " + data);
      this.products = data.content;
    })
  }
}
