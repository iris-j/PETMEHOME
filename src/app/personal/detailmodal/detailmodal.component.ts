import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-detailmodal',
  templateUrl: './detailmodal.component.html',
  styleUrls: ['./detailmodal.component.scss'],
})
export class DetailmodalComponent implements OnInit {
  public items : any;
  public title : string;
  constructor(public modalController: ModalController, navParams: NavParams) {
    console.log(navParams.get('records'));
    this.items = navParams.get('records');
    this.title = navParams.get('title');
    console.log(this.items, this.title);
   }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
