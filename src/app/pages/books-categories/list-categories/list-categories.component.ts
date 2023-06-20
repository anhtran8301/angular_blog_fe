import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  isLogin = false;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
