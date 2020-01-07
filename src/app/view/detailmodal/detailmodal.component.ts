import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detailmodal',
  templateUrl: './detailmodal.component.html',
  styleUrls: ['./detailmodal.component.scss'],
})
export class DetailmodalComponent implements OnInit {
  public item : any;
  public reporter : any;
  private current_user_id : any;
  private server : string = environment.server_url;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true,
    loop: true,
  };
  constructor(public modalController: ModalController, navParams: NavParams, public alertController: AlertController, private http: HttpClient, private storage: Storage) { 
    console.log(navParams.get('record'));
    this.item = navParams.get('record');
    this.reporter = navParams.get('reporter');
    console.log(navParams.get('reporter'));
  }

  ngOnInit() {
    this.storage.get('current_user').then((val)=>{
      this.current_user_id = val;
      console.log(this.current_user_id);
    },(error : any) =>
    {
      console.dir(error);
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: '提供信息',
      inputs: [{
        name: 'info',
        type: 'text',
        placeholder: '输入信息'
      }],
      buttons: [{
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            // console.log('Confirm Cancel');
          }
        },{
          text: '确认',
          handler: (alertdata)=>{
            console.log(alertdata.info);
            // send this message to backend, to store in mongodb
            let url : any = this.server + "api/message",
            options : any = {'action': 'lostmessage', 'from': this.current_user_id, 'to': this.reporter._id, 'lostid': this.item._id, 'message': alertdata.info, 'date': Date.now};
            console.log(options);
            this.http.post(url, options).subscribe((data: any)=>{},
            (error : any) =>{
              console.dir(error);
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
