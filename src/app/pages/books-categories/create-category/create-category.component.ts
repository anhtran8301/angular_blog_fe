import { Component } from '@angular/core';
import { BookCategory } from 'src/app/models/BookCategory';
import { BookCategoryService } from 'src/app/service/book-category.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  form: any = {};
  bookCategory!: BookCategory;

  constructor(
    private bookCategoryService: BookCategoryService,
    private toast: ToastrService,
  ) { }

  onUpLoad($event: string) {
    this.form.image = $event;
  }

  createBookCategory() {
    this.bookCategory = new BookCategory(
      this.form.name,
      this.form.description,
      this.form.image
    )
    if (this.form.image == undefined) {
      this.toast.error("The image value can not blank")
    } else {
      this.bookCategoryService.create(this.bookCategory).subscribe(data => {
        console.log(data);
        this.toast.success("Created Successfully")
      }, errorResponse => {
        this.toast.error(errorResponse.error.message)
      })
    }

  }
}
