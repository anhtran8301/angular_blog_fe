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

  // getProductsByBookCategory(bookCategoryId: number): Observable<any> {
  //   const pathUrl = `${this.API_PRODUCT}/categories/${bookCategoryId}`
  //   return this.httpClient.get<any>(pathUrl);
  // }
  getProductsByBookCategory(bookCategoryId: number, pageNo: number, pageSize: number): Observable<any> {
    const pathUrl = `${this.API_PRODUCT}/categories/${bookCategoryId}?pageNo=${pageNo}&pageSize=${pageSize}`
    return this.httpClient.get<any>(pathUrl);
  }


  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.API_PRODUCT);
  }

  getProductsPaginate(pageNo: number, pageSize: number): Observable<any> {
    const paginationUrl = `${this.API_PRODUCT}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(paginationUrl);
  }

  searchProducts(keyword: string, pageNo: number, pageSize: number): Observable<any> {
    const pathSearch = `${this.API_PRODUCT}/search?query=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`
    return this.httpClient.get<any>(`${pathSearch}`)
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_PRODUCT}/${id}`)
  }

  getNewestProducts(pageNo: number, pageSize: number): Observable<any> {
    const paginationUrl = `${this.API_PRODUCT}/newest?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(paginationUrl);
  }

  getTrendingProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_PRODUCT}/best-seller`);
  }

  getProductsByAuthor(authorId: number, pageNo: number, pageSize: number): Observable<any> {
    const pathUrl = `${this.API_PRODUCT}/authors/${authorId}?pageNo=${pageNo}&pageSize=${pageSize}`
    console.log("path" + pathUrl);
    
    return this.httpClient.get<any>(pathUrl);
  }
}
