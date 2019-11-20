import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';

@Injectable({
  providedIn: 'root'
})
// get the form values and post to rest. how to handle pictures?
export class PostinfoService {
  public images: String[]=[];
  constructor(private camera: Camera, private storage:Storage, private http: HttpClient, public photoService: PhotoService) { }

  takePicture(){
    console.log("take a picture from me");
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.images.push("data:image/jpeg;base64," + imageData);
      // return "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });

  }

  selectPicture(){
    console.log("select a photo from me");
    const options : CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.images.push("data:image/jpeg;base64," + imageData);
      // return "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    }); 

  }
  postinfo(info){
    console.log(info);
    console.log(this.images);
    let address   : any = info.address,
        detail    : any = info.detail,
        contact   : any = info.contact,
        images    : any = this.images,
    url : any = "http://192.168.43.200:9090/" + "api/lost",
    // headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options       : any	     = { "address":address, "detail" : detail, "contact" : contact, "images": images };
    this.http
        .post(url, options)
        .subscribe((data : any) =>
        {
        },
        (error : any) =>
        {
          console.dir(error);
        });
    this.images = [];    
  }
}
