import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from './../providers/auth/auth.service';

import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage:any = LoginPage;
  authState$: Observable<any>;

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthProvider,
  ) {
    this.authState$ = this.authService.getAuthStateObserver();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authState$.subscribe( authState => {
      console.log('App Component, authState: ', authState);
      if (!authState) {
        this.nav.setRoot('LoginPage');
      }
    })
  }
}
