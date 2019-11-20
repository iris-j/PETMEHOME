import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostinfoService } from '../../services/postinfo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-postlost',
  templateUrl: './postlost.page.html',
  styleUrls: ['./postlost.page.scss'],
})
export class PostlostPage implements OnInit {

  constructor(public postService: PostinfoService, private http: HttpClient, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
  postinfo(form){
    this.postService.postinfo(form.value);
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传图片',
      buttons: [{
        text: '相机拍摄',
        icon: 'camera',
        handler: () => {
          this.postService.takePicture();
        }
      }, {
        text: '从相册选择',
        icon: 'images',
        handler: () => {
          this.postService.selectPicture();
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
