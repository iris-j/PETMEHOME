import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProfileComponent} from '../profile/profile.component';
import { PasswordComponent } from '../password/password.component';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private host: string = environment.url;
  public current_user: any;
  constructor(private http: HttpClient, private storage:Storage, public modalController: ModalController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.storage.get('current_user').then((val) => {
      let current_user_id = val;
      this.http.get(this.host+'api/user/'+current_user_id)
      .subscribe((data: any)=>{
        this.current_user = data.records;
      })
    }, (error: any)=>{
      console.dir(error);
    });
  }

  quit(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async presentModal(info: any){
    const modal = await this.modalController.create({
      component: ProfileComponent,
      componentProps: {
        'info': info,
      }
    });
    return await modal.present();
  }

  async presentModal_password(info: any){
    const modal = await this.modalController.create({
      component: PasswordComponent,
      componentProps: {
        'info': info,
      }
    });
    return await modal.present();
  }
}
