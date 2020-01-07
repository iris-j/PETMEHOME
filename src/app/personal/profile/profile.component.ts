import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Action } from 'rxjs/internal/scheduler/Action';
import { PhotoService } from '../../services/photo.service';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public info : any;
  private server_url : string = environment.url;
  constructor(private http: HttpClient, public modalController: ModalController, public actionSheetController: ActionSheetController, 
    public toastController: ToastController, navParams: NavParams, public photoService: PhotoService) { 
    console.log(navParams.get('info'));
    this.info = navParams.get('info');
  }

  ngOnInit() {}

  postinfo(form){
    let user_options = form;
    if (this.photoService.image){
      user_options['avatar']=this.photoService.image;
      this.photoService.image = '';
    }
    user_options['action'] = "editprofile";
    console.log(user_options);
    let user_url = this.server_url + "api/user/"+this.info._id;
    this.http.put(user_url, user_options).subscribe((data: any)=>{},
    (error: any)=>{console.dir(error)});
    this.dismiss();
    this.presentToast();

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传图片',
      buttons: [{
        text: '相机拍摄',
        icon: 'camera',
        handler: () => {
          this.photoService.takePicture();
        }
      }, {
        text: '从相册选择',
        icon: 'images',
        handler: () => {
          this.photoService.selectPicture();
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: '修改成功!',
      duration: 2000,
      position: "middle",
      cssClass: "myCss"
    });
    toast.present();
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
