import { Component, OnInit } from '@angular/core';
import { Ads } from 'src/app/models/Ads';
import { AdsService } from 'src/app/service/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  listAds: Ads[] = [];

  currentIndex: number = 0;
  interval: any;

  constructor(
    private adsService: AdsService
  ) { }

  ngOnInit(): void {
    this.getAllAds();
  }

  getAllAds() {
    this.adsService.getAllAds().subscribe(data => {
      this.listAds = data;
    })
  }

}
