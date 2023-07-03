import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { TokenService } from 'src/app/service/token.service';
import { BookCategory } from 'src/app/models/BookCategory';
import { BookCategoryService } from 'src/app/service/book-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  // isLogin = false;
  isAdmin = false;
  listBooksCategories: BookCategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'image'];
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private bookCategoryService: BookCategoryService) { }

  reload(data: any) {
    this.listBooksCategories = data;
    this.dataSource = new MatTableDataSource<BookCategory>(this.listBooksCategories);
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.tokenService.getRole().forEach(role => {
        if (JSON.stringify(role) === JSON.stringify('ROLE_ADMIN')) {
          this.isAdmin = true;
        }
      });

    }
    this.bookCategoryService.getAll().subscribe(data => {
      this.reload(data);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true || result == undefined) {
        this.bookCategoryService.getAll().subscribe(data => {
          this.reload(data);
        })
      }
    });
  }
}
