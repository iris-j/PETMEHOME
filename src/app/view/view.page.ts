import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public items : Array<any>;
  // Used to store the retrieved documents from the MongoDB database
  // private host : string = "http://192.168.43.200:9090/";
  private host : string = "http://localhost:9090/";
  constructor(public modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
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

  async viewRecord(item: any) {
    const modal = await this.modalController.create({
      component: DetailmodalComponent,
      componentProps: {
        'record' : item
      }
    });
    return await modal.present();
  }

}
