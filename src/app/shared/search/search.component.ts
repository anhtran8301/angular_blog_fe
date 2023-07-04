import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void { }

  doSearch(value: string) {
    value != '' ? this.router.navigateByUrl(`products/search/${value}`) : this.toast.error("Not thing to search");
  }
}
