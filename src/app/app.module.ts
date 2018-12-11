import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AuthProvider } from '../providers/auth/auth.service';
import { IonicStorageModule } from '@ionic/storage';

export function initConfig(
  authService: AuthProvider
  ): () => Promise<any> {
  return (): Promise<any> => {

    return new Promise((resolve, reject) => {
      authService.checkToken().then( authData => {
      //authService.getAuthStateObserver().subscribe(authData => {
        console.log("initConfig: get authData");
        console.log(authData);
        resolve();
      })
    });
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'meu-starter.login-flow.ionic-v3',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [AuthProvider]
    }
  ]
})
export class AppModule {}
