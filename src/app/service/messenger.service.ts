import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(productId: number) {
    this.subject.next(productId)
  }

  getMsg() {
    return this.subject.asObservable()
  }
}
