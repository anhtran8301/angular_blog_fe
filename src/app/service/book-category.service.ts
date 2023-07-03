import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BookCategory } from '../models/BookCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  // private API_BOOK_CATEGORY = environment.API_LOCAL + '/books-categories'
  private API_BOOK_CATEGORY = `${environment.API_LOCAL}/books-categories`;
  
  constructor(
    private httpClient: HttpClient) { }

  create(category: BookCategory): Observable<any> {
    return this.httpClient.post<any>(this.API_BOOK_CATEGORY, category);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.API_BOOK_CATEGORY)
  }
}
