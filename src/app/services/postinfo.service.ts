import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PhotoService } from './photo.service';
import { AuthService } from './auth.service';
import { environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
// get the form values and post to rest. how to handle pictures?
export class PostinfoService {
  public images: String[]=[];
  private server_url : string = environment.url;
  constructor(private camera: Camera, private storage:Storage, private http: HttpClient, public photoService: PhotoService, private authService: AuthService) { }

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
  postlost(info){
    console.log(info);
    console.log(this.images);
    this.storage.get('current_user').then((val) => {
      let current_user = val;
      console.log(current_user);
      let address   : any = info.address,
        detail    : any = info.detail,
        title     : any = info.title,
        contact   : any = info.contact,
        images    : any = this.images,
      url : any = this.server_url + "api/lost",
      // headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options       : any	     = { "reporter": current_user, "address":address, "detail" : detail, "title": title, "contact" : contact, "images": images };
      this.http.post(url, options)
          .subscribe((data : any) =>{
            console.log(data);
            let user_url = this.server_url + "api/user/"+current_user,
            user_options = {'action':'postlost','lostid':data.lostid};
            this.http.put(user_url, user_options).subscribe((data: any)=>{},
            (error: any)=>{console.dir(error)});
          },(error : any) =>
          {
            console.dir(error);
          });
      
      this.images = [];    
    });
  }

  postpet(info){
    console.log(info);
    console.log(this.images);
    this.storage.get('current_user').then((val)=>{
      let current_user = val;
      console.log(current_user);
      let url : any = this.server_url + "api/pet",
      options : any	= { "reporter": current_user, "name":info.name, "sex":info.sex, "age":info.age, 
      "type": info.type, "size":info.size, "address":info.address, "images": this.images};
      this.http.post(url, options).subscribe((data: any)=>{
        console.log(data);
        let user_url = this.server_url + "api/user/"+current_user,
            user_options = {'action':'postpet','petid':data.petid};
            this.http.put(user_url, user_options).subscribe((data: any)=>{},
            (error: any)=>{console.dir(error)});
      },(error: any)=>{console.dir(error);});

      this.images = [];
    });
  }
}
