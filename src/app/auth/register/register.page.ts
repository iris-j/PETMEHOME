import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentialsForm: FormGroup;
  constructor(public photoService: PhotoService, private formBuilder: FormBuilder, private authService: AuthService, public actionSheetController: ActionSheetController) { }

  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
        this.credentialsForm &&
        (control.value !== this.credentialsForm.controls.password.value)
    ) {
        return { passwordNotMatch: true };
    }
    return null;
  }



  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]],
      nickname: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传头像',
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
  register(){
    let allinfo = this.credentialsForm.value;
    allinfo['avatar'] = this.photoService.image;
    console.log(allinfo);
    this.photoService.image = "";
    this.authService.register(allinfo).subscribe(res => {
      this.authService.login(this.credentialsForm.value).subscribe();
    })
  }

}
