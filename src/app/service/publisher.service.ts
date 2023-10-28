import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private API_PUBLISHER = `${environment.API_LOCAL}/publishers`;
  
  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.API_PUBLISHER)
  }
}
