import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod";
import { Ads } from '../models/Ads';

@Injectable({
    providedIn: 'root'
})

export class AdsService {
    private API_ADS = `${environment.API_LOCAL}/ads`;

    constructor(private httpClient: HttpClient) {}

    getAllAds(): Observable<any> {
        return this.httpClient.get<any>(this.API_ADS);
    }
}