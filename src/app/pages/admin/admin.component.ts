import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/models/Product';
import { TokenService } from 'src/app/service/token.service';
import { ProductService } from 'src/app/service/product.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CreateProductComponent } from './create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  listProducts: Product[] = [];
  dataSource: any;
  isAdmin = false;
  panelOpenState = false;

  myControl = new FormControl('');
  displayedColumns: string[] = ['id', 'imagesString', 'name', 'quantity', 'sold', 'discount', 'unitPrice', 'action'];

  options: string[] = ['Flash sale', 'Đang giảm giá', 'Hết hàng', 'Sắp hết hàng', 'Ngừng kinh doanh'];

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private toast: ToastrService,
    
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reload(data: any) {
    this.listProducts = data;
    this.dataSource = new MatTableDataSource<Product>(this.listProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filteredOptions!: Observable<string[]>;
  allComplete: boolean = false;


  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.tokenService.getRole().forEach(role => {
        if (JSON.stringify(role) === JSON.stringify('ROLE_ADMIN')) {
          this.isAdmin = true;
        }
      });

    }
    this.getProducts();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.reload(data.content);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true || result == undefined) {
        this.productService.getAllProducts().subscribe(data => {
          this.reload(data.content);
        })
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      },
    });
  }

  deleteEmployee(id: number) {
    this.productService.delete(id).subscribe({
      next: (res) => {
        this.toast.success("Xóa thành công");
        this.getProducts();
      },
      error: console.log,
    });
  }

  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => (t.completed = completed));
  // }


}
