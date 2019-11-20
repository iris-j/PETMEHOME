import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detailmodal',
  templateUrl: './detailmodal.component.html',
  styleUrls: ['./detailmodal.component.scss'],
})
export class DetailmodalComponent implements OnInit {
  public item : any;
  constructor(public modalController: ModalController, navParams: NavParams) { 
    console.log(navParams.get('record'));
    this.item = navParams.get('record');
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
