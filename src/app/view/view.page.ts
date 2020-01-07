import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public items : Array<any>;
  // Used to store the retrieved documents from the MongoDB database
  // private host : string = "http://192.168.43.200:9090/";
  private host : string = environment.url;
  private reporter_info;
  constructor(public modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.retrieve();
  }
  ionViewWillEnter() {
    this.retrieve();
  }

  retrieve() : void {
    this.http.get(this.host+'api/lost')
    .subscribe((data: any) =>
    {
      this.items = data.records;
    },(error: any) =>{
      console.dir(error);
    })
  }

  async presentModal(item: any, reporter_info: any) {
    // item.date = item.date.match(/[\d-]+/g)[0];
    const modal = await this.modalController.create({
      component: DetailmodalComponent,
      componentProps: {
        'record' : item,
        'reporter' : reporter_info,
      }
    });
    return await modal.present();
  }
  async viewRecord(item: any) {
    const reporter_id = item.reporter;
    this.http.get(this.host+'api/user/'+reporter_id)
    .subscribe((data: any) => {
      this.reporter_info = data.records;
      this.presentModal(item, this.reporter_info);
      
    })
    // const modal = await this.modalController.create({
    //   component: DetailmodalComponent,
    //   componentProps: {
    //     'record' : item
    //   }
    // });
    // return await modal.present();
  }

}
