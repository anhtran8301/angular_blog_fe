import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod";
import { Ads } from '../models/Ads';
import { CheckOutForm } from '../models/CheckOutForm';

@Injectable({
    providedIn: 'root'
})

export class CheckOutService {
    private API_CHECKOUT = `${environment.API_LOCAL}/orders/checkout`;

    constructor(private httpClient: HttpClient) { }

    checkOut(checkOutForm: CheckOutForm): Observable<any> {
        return this.httpClient.post<any>(this.API_CHECKOUT, checkOutForm);
    }
}