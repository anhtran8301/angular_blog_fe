import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod";
import { Ads } from '../models/Ads';

@Injectable({
    providedIn: 'root'
})

export class UserAddressService {
    private API_ADDRESS = `${environment.API_LOCAL}/addresses`;

    constructor(private httpClient: HttpClient) {}

    getUserAddress(): Observable<any> {
        return this.httpClient.get<any>(this.API_ADDRESS);
    }
}