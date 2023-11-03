import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-up-comming-products',
  templateUrl: './up-comming-products.component.html',
  styleUrls: ['./up-comming-products.component.scss']
})
export class UpCommingProductsComponent implements OnInit {

  products: Product[] = [];
  currentProduct!: Product;
  lastProductIndex: number = -1;

  

  @ViewChild('scrollDiv') scrollDiv!: ElementRef;

  constructor(private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2) { }

    ngOnInit(): void {
      this.getComingUpProducts();
    }


  getComingUpProducts() {
    this.productService.getComingUpProducts().subscribe(data => {
      this.products = data.content;
      this.currentProduct = this.products[0];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const productIndex = this.determineVisibleProduct();
    if (productIndex !== -1 && productIndex !== this.lastProductIndex) {
      this.currentProduct = this.products[productIndex];
      this.lastProductIndex = productIndex;
      // this.imgSrc = this.currentProduct.imagesString;
    }
  }

  determineVisibleProduct(): number {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
  
    for (let i = 0; i < this.products.length; i++) {
      const productElement = document.getElementById(`product-${this.products[i].id}`);
      if (productElement) {
        const elementTop = productElement.getBoundingClientRect().top;
        const elementBottom = productElement.getBoundingClientRect().bottom;
  
        if (elementTop <= windowHeight / 2 && elementBottom >= windowHeight / 2) {
          return i;
        }
      }
    }
  
    return -1;
  }
}
