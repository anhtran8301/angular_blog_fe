import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private API_AUTHOR = `${environment.API_LOCAL}/authors`;
  
  constructor(
    private httpClient: HttpClient) { }

//   create(category: BookCategory): Observable<any> {
//     return this.httpClient.post<any>(this.API_AUTHOR, category);
//   }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.API_AUTHOR)
  }
}
