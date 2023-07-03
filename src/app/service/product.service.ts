import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_PRODUCT = `${environment.API_LOCAL}/products`;
  
  constructor(private httpClient: HttpClient) { }

  getProductsByBookCategory(bookCategoryId: number): Observable<any>{
    const pathUrl = `${this.API_PRODUCT}/categories/${bookCategoryId}`
    // console.log("path: ", pathUrl);
    return this.httpClient.get<any>(pathUrl);
  }

  getAllProducts(): Observable<any>{
    // console.log("path: ", pathUrl);
    return this.httpClient.get<any>(this.API_PRODUCT);
  }
}
