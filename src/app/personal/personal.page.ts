import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  private host: string = environment.url;
  public current_user: any;
  constructor(private http: HttpClient, private storage:Storage, public modalController: ModalController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAthenticated().then((val)=>{
      console.log(val);
      if (!val){
        this.router.navigate(['/login']);
      }
    }, (err)=>{});
    // if (!this.authService.isAthenticated()){
    //   this.router.navigate(['/login']); // if not authenticated, return to login page
    // }
    
    this.retrieve();
  }

  ionViewWillEnter() {
    this.retrieve();
  }

  async retrieve(){
    await this.storage.get('current_user').then((val) => {
      let current_user_id = val;
      console.log(current_user_id);
      this.http.get(this.host+'api/personal/'+current_user_id)
      .subscribe((data: any)=>{
        this.current_user = data;
        console.log(data);
      })
    }, (error: any)=>{
      console.dir(error);
    });
  }

  async presentModal(items: any, title: any){
    const modal = await this.modalController.create({
      component: DetailmodalComponent,
      componentProps: {
        'records': items,
        'title': title,
      }
    });
    return await modal.present();
  }

  getmyfavorite(){
    this.presentModal(this.current_user.favorite, "我的关注");
  }

  getmyadopt(){
    this.presentModal(this.current_user.adopt, "我的领养");
  }

  getmypost(){
    let allpost = {'lost': this.current_user.postlost, 'pet': this.current_user.postpet}
    this.presentModal(allpost, "我的发布")
  }

  getmymessage(){
    this.http.get(this.host+'api/message/'+this.current_user._id)
      .subscribe((data: any)=>{
        this.presentModal(data, "我的消息")
        console.log(data);
      })
  }




}
