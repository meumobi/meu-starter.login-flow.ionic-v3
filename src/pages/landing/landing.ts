import { AuthProvider } from './../../providers/auth/auth.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  authData$: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthProvider
  ) {
    this.authData$ = this.authService.getAuthStateObserver();
  }

  logout() {
    this.authService.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

/*   ionViewCanEnter(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.authData$.subscribe( authData => {
        console.log('authguard-0: ', authData);
        if (!authData) {
          console.log('authguard-1: ', authData);
          resolve(false);
          console.log('authguard-2: ', authData);
        } else {
          resolve(true);
        }
      })
    })
   } */

  ionViewCanEnter(): boolean {
    return this.authService.isAuthenticated();
  }

}
