import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_POST = environment.API_LOCAL + '/posts'

  constructor(private httpClient: HttpClient) { }

  findAll (): Observable<any>{
    return this.httpClient.get<any>(this.API_POST);

  }
}
