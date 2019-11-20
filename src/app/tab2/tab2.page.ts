import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public photoService: PhotoService, private http: HttpClient) {  }
  ngOnInit() {
    this.photoService.loadSaved();
    let name : any = "test",
      description   : any = "test description",
      thumbnail   	: any = 'data:image/jpeg;base64,',
      displayed     : any = true,
      url : any = "http://192.168.43.200:9090/" + "api/pet",
      // headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options       : any	     = { "name":name, "description" : description, "thumbnail" : thumbnail, "displayed": displayed };
      this.http
         .post(url, options)
         .subscribe((data : any) =>
         {
         },
         (error : any) =>
         {
            console.dir(error);
         });
  }

}
