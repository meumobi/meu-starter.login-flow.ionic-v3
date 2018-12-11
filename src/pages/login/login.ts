import { AuthProvider } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user: FormGroup;
  authState$: Observable<any>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private authService: AuthProvider,
  ) {
    this.authState$ = this.authService.getAuthStateObserver();
/*     this.user = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    }); */
  }

  login() {
    this.authService.login()
    .then(response => {
      console.log('Login setRoot');
      //this.navCtrl.setRoot('LandingPage');
    })
    .catch (err => {
      console.error(err);
    })
  }

  logout() {
    this.authService.logout();
  }

  openPage(page) {
    this.navCtrl.setRoot(page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
  