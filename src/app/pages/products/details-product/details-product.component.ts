import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const productId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      console.log("product", product);
    })
    
    
  }

}
