import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  public credentialsForm: FormGroup;
  public info: any;
  private server_url : string = environment.url;
  constructor(private http: HttpClient, public modalController: ModalController, public toastController: ToastController, navParams: NavParams,
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    console.log(navParams.get('info'));
    this.info = navParams.get('info');
  }
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
        this.credentialsForm &&
        (control.value !== this.credentialsForm.controls.newpassword.value)
    ) {
        return { passwordNotMatch: true };
    }
    return null;
  }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(4)]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]],
    });
  }

  postinfo(){
    let allinfo = this.credentialsForm.value;
    allinfo['id'] = this.info._id;
    console.log(allinfo);
    this.http.post(this.server_url+'api/changepassword', allinfo).subscribe(
      (data: any)=>{
        console.log(data);
        this.dismiss();
        this.presentToast('修改成功！');
        // this.router.navigate(['/login']);
      },(error : any) =>
      {
        this.presentToast(error.error.msg);
        console.dir(error);
      }
    )
    // this.authService.changePassword(allinfo).subscribe(res => {
    //   this.router.navigate(['/login']);
    // })

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
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
