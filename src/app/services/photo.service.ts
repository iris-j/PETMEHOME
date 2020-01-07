import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public image : String = ''
  constructor(private camera: Camera, private storage:Storage, private http: HttpClient) {}
  takePicture(){
    console.log("take a picture from me");
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = "data:image/jpeg;base64," + imageData;
      // this.storage.set('photo', this.image);
      return this.image;
      // return "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });

  }

  selectPicture(){
    const options : CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = "data:image/jpeg;base64," + imageData;
      // this.storage.set('photo', this.image);
      return this.image;
      // return "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    }); 

  }
  loadSaved() {
    this.storage.get('photo').then((photo) => {
      this.image = photo || '';
    });
  }



  // public photos: Photo[] = [];

  // constructor(private camera: Camera, private storage:Storage, private http: HttpClient) {}

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //     // Add new photo to gallery
  //     this.photos.unshift({
  //         data: 'data:image/jpeg;base64,' + imageData
  //     }); 
  //     // Save all photos for later viewing
  //     this.storage.set('photos', this.photos);
  //     let name : any = "test",
  //     description   : any = "test description",
  //     thumbnail   	: any = 'data:image/jpeg;base64,'+imageData,
  //     displayed     : any = true,
  //     url : any = "http://192.168.43.200:9090/" + "api/pet",
  //     // headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     options       : any	     = { "name":name, "description" : description, "thumbnail" : thumbnail, "displayed": displayed };
  //     this.http
  //        .post(url, options)
  //        .subscribe((data : any) =>
  //        {
  //        },
  //        (error : any) =>
  //        {
  //           console.dir(error);
  //        });
    
  //   }, (err) => {
  //     // Handle error
  //     console.log("Camera issue: " + err);
  // });
     
       
  // }

  // loadSaved() {
  //   this.storage.get('photos').then((photos) => {
  //     this.photos = photos || [];
  //   });
  // }
}

class Photo {
  data: any;
}