import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetailmodalComponent } from './detailmodal/detailmodal.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  public items : Array<any>;
  public loadeditems : Array<any>;
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
    this.http.get(this.host+'api/pet')
    .subscribe((data: any) =>
    {
      this.items = data;
      this.loadeditems = data;
    },(error: any) =>{
      console.dir(error);
    })
  }

  initializeItems(): void {
    this.items = this.loadeditems;
  }

  filterList(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.items = this.items.filter(item => {
      if ((item.name||item.address||item.type) && searchTerm) {
        if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        else if (item.address.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        else if (item.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  } 

  
  async presentModal(item: any, reporter_info: any) {
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
    this.reporter_info = item.reporter;    
    this.presentModal(item, this.reporter_info);
  
    
    // const modal = await this.modalController.create({
    //   component: DetailmodalComponent,
    //   componentProps: {
    //     'record' : item
    //   }
    // });
    // return await modal.present();
  }

}
