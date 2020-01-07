import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detailmodal',
  templateUrl: './detailmodal.component.html',
  styleUrls: ['./detailmodal.component.scss'],
})
export class DetailmodalComponent implements OnInit {
  public item : any;
  private host : string = environment.url;
  private server : string = environment.server_url;
  public reporter : any;
  private current_user : any;
  private follow_state : Boolean;
  private adopt_state: Boolean;
  
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true,
    loop: true,
  };
  constructor(public modalController: ModalController, public alertController: AlertController, navParams: NavParams, private http: HttpClient, private storage:Storage) { 
    console.log(navParams.get('record'));
    this.item = navParams.get('record');
    this.reporter = navParams.get('reporter');
    console.log(navParams.get('reporter'));
  }

  ngOnInit() {
    this.storage.get('current_user').then((val) => {
      let current_user_id = val;
      console.log(current_user_id);
      this.http.get(this.host+'api/user/'+current_user_id) // check follow state
      .subscribe((data: any) => {
        this.current_user = data.records;
        if (this.current_user.favorite.indexOf(this.item._id)==-1){
          this.follow_state = false;
        }
        else{
          this.follow_state = true;
        }
        console.log("follow state on init:", this.follow_state);

        if (this.current_user.adopt.indexOf(this.item._id)==-1){
          this.adopt_state = false;
        }
        else{
          this.adopt_state = true;
        }
        console.log("adopt state on init:", this.adopt_state);
      })

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

  follow(){ // change state to the opposite
    if (this.follow_state == true){ // now unfollow
      let user_url = this.host + "api/user/"+this.current_user._id,
            user_options = {'action':'unfollow','petid':this.item._id};
            this.http.put(user_url, user_options).subscribe((data: any)=>{
              console.log(data.records);
            },
            (error: any)=>{console.dir(error)});
      this.follow_state = false;     
    }
    else { // now follow
      let user_url = this.host + "api/user/"+this.current_user._id,
            user_options = {'action':'follow','petid':this.item._id};
            this.http.put(user_url, user_options).subscribe((data: any)=>{
              console.log(data.records);
            },
            (error: any)=>{console.dir(error)});
      this.follow_state = true; 
    }
    console.log("change follow state to:", this.follow_state);
    
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: '确认领养',
      inputs: [{
        name: 'info',
        type: 'text',
        placeholder: '输入请求'
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
          handler: (alertdata)=>{ // send message to owner, add pet to user adopt list
            console.log(alertdata.info);
            // send this message to backend, to store in mongodb
            let url : any = this.server + "api/message",
            options : any = {'action': 'petmessage','from': this.current_user._id, 'to': this.reporter._id, 'petid': this.item._id, 'message': alertdata.info, 'date': Date.now};
            console.log(options); 
            this.http.post(url, options).subscribe((data: any)=>{},
            (error : any) =>{
              console.dir(error);
            });          
            let user_url = this.server + "api/user/"+this.current_user._id,
            user_options = {'action': 'adopt', 'petid':this.item._id};
            this.http.put(user_url, user_options).subscribe((data:any)=>{console.log(data);this.adopt_state=true;},
            (error: any)=>{console.dir(error)});
          }
        }
      ]
    });
    await alert.present();
  }

}
