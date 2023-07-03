import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent {
  selectedFile?: File;
  ref?: AngularFireStorageReference;
  downloadURL?: string;
  checkUploadAvatar = false;

  //@Output truyền dữ liệu từ component này sang component khác thông qua EventEmitter
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage, private toast: ToastrService) {
  }

  onFileChanged($event: any) {
    this.selectedFile = $event.target.files[0];
    this.onUpload();
  }
  onUpload() {
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2); //Tạo ra 1 name riêng cho mỗi DB firebase;
    // console.log('id ---> ', id);
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then(snapshot => {
      return snapshot.ref.getDownloadURL(); //Trả về 1 chuỗi siêu văn bản trên firebase.
    }).then(downloadURL => { //chuyển giao từ những component khác nhau khi upload
      this.downloadURL = downloadURL;
      this.giveURLtoCreate.emit(this.downloadURL);
      this.checkUploadAvatar = false;
      return downloadURL;
    })
      .catch(error => {
        this.toast.error(error)
        // console.log(`Failed to upload avatar and get link ${error}`);
      })
  }
}
