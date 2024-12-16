import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { BookCategoryService } from 'src/app/service/book-category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';
import { BookCategory } from 'src/app/models/BookCategory';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthorService } from 'src/app/service/author.service';
import { PublisherService } from 'src/app/service/publisher.service';
import { Publisher } from 'src/app/models/Publisher';
import { Author } from 'src/app/models/Author';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateProduct } from 'src/app/models/UpdateProduct';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: any = {};
  product!: Product;
  updateProduct!: UpdateProduct

  selectCateId!: any;
  selectPubId!: any;
  selectAuthorId!: any;

  booksCategories: BookCategory[] = [];
  publishers: Publisher[] = [];
  authors: Author[] = [];

  namesCateArray: string[] = [];
  namesPublishersArray: string[] = [];
  namesAuthorsArray: string[] = [];

  cateControl = new FormControl('');
  pubControl = new FormControl('');
  authorControl = new FormControl('');

  allComplete: boolean = false;

  filteredOptionsCate!: Observable<string[]>;
  filteredOptionsPublishers!: Observable<string[]>;
  filteredOptionsAuthors!: Observable<string[]>;

  constructor(
    private bookCategoryService: BookCategoryService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private toast: ToastrService,
    private productService: ProductService,
    private dialog: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onUpLoad($event: string) {
    this.form.imagesString = $event;
  }

  ngOnInit(): void {
    if (this.data) {
      this.form = this.data
    }

    this.loadCategories();
    this.loadPublishers();
    this.loadAuthor();

    this.filteredOptionsCate = this.cateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.namesCateArray)),
    );

    this.filteredOptionsPublishers = this.pubControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.namesPublishersArray)),
    );

    this.filteredOptionsAuthors = this.authorControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.namesAuthorsArray)),
    );
  }

  private _filter(value: string, sourceArray: string[]): string[] {
    const filterValue = value.toLowerCase();
    return sourceArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.data) {
      this.updateProduct = new UpdateProduct(
        this.form.sku,
        this.form.name,
        this.form.description,
        this.form.unitPrice,
        this.form.imagesString,
        true,
        this.form.releaseDate,
        this.form.quantity,
        this.form.discount,
        this.selectAuthorId,
        this.selectPubId,
        this.selectCateId,
      ) 
      console.log("update product", this.updateProduct);
      console.log(this.form.id);
      
      this.productService.updateProductById(this.form.id, this.updateProduct).subscribe(
        {
          next: () => this.toast.success("Sửa thành công"),
          error: (errorResponse) => this.toast.error(errorResponse.error.message)
        });
    }
    else {
      this.product = new Product(
        this.form.id,
        this.form.sku,
        this.form.name,
        this.form.description,
        this.form.unitPrice,
        this.form.imagesString,
        true,
        new Date(),
        this.form.quantity,
        this.form.discount,
        this.selectAuthorId,
        this.selectPubId,
        this.selectCateId,
      )
      if (this.form.imagesString == undefined) {
        this.toast.error("Chưa có hình ảnh")
      } else {
        console.log(this.product);

        this.productService.addProduct(this.product).subscribe(
          {
            next: () => this.toast.success("Thêm thành công"),
            error: (errorResponse) => this.toast.error(errorResponse.error.message)
          });
      }
    }
  }

  loadCategories() {
    this.bookCategoryService.getAll().subscribe(data => {
      this.booksCategories = data;
      for (const item of this.booksCategories) {
        this.namesCateArray.push(item.name);

      }
    })
  }

  loadPublishers() {
    this.publisherService.getAll().subscribe(data => {
      this.publishers = data;
      for (const item of this.publishers) {
        this.namesPublishersArray.push(item.name);

      }
    })
  }

  loadAuthor() {
    this.authorService.getAll().subscribe(data => {
      this.authors = data;
      for (const item of this.authors) {
        this.namesAuthorsArray.push(item.name);

      }
    })
  }

  OnCateSelected(option: MatOption) {
    const selectedValue = option.value;
    this.selectCateId = this.booksCategories.find(category => category.name === selectedValue)?.id;

  }

  OnPubSelected(option: MatOption) {
    const selectedValue = option.value;
    this.selectPubId = this.publishers.find(pub => pub.name === selectedValue)?.id;
  }

  OnAuthorSelected(option: MatOption) {
    const selectedValue = option.value;
    this.selectAuthorId = this.authors.find(author => author.name === selectedValue)?.id;
  }
}