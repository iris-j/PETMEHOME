import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Location } from "@angular/common";
const TOKEN_KEY = 'access_token';
const CURRENT_USER = 'current_user'; // to identify current user for further operations

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false); //problems with behavior subject when used in emulator and quit the app.
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private router: Router, private location: Location) { 
      this.plt.ready().then(()=>{
        this.checkToken();
      });
  }
  checkToken(){
    this.storage.get(TOKEN_KEY).then(token =>{
      if (token){
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired){
          this.user = decoded;
          this.authenticationState.next(true);
        }else{
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(CURRENT_USER);
        }
      }
    });
  }

  register(credentials){
    return this.http.post(this.url+'api/register', credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials){
    return this.http.post(this.url+'api/login', credentials).pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY, res['token']);
        this.user = this.helper.decodeToken(res['token']);
        this.authenticationState.next(true);
        this.storage.set(CURRENT_USER, this.user.id);
        console.log(this.user);
        console.log(this.isAthenticated());
        // this.isAthenticated().then((val)=>{
        //   console.log(val);
        //   if (val){
        //     this.router.navigate(['/tabs/personal']);
        //   }
        // }, (err)=>{});
        // if (this.isAthenticated()){
        //   // this.location.back();
        //   this.router.navigate(['/tabs/personal']);
        // }
        this.router.navigate(['/tabs/personal']);
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  changePassword(credentials){
    return this.http.post(this.url+'api/changepassword', credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    )
  }

  logout(){
    this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
    });
    this.storage.remove(CURRENT_USER).then(()=>{
    })
  }


  isAthenticated(){
    // return this.authenticationState.getValue();
    // directly get from storage rather than use observable
    return this.storage.get(TOKEN_KEY).then((token) => {
      if (token){
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired){
          this.user = decoded;
          this.authenticationState.next(true);
          return true;
        }else{
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(CURRENT_USER);
          return false;
        }
      }
      return false;
   });
   
    
  }
  showAlert(msg){
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
