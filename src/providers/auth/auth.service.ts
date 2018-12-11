import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "X-Auth-Token";

@Injectable()

export class AuthProvider {

  authState$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then( _ => {
      //this.checkToken();
    })
  }

  public checkToken(): Promise<any> {
    return this.storage.get(TOKEN_KEY).then( res => {
      console.log('Login Storage Get: Check Token');
      if (res) {
        this.authState$.next(true);
      }
      return res;
    })
  }

  public login(): Promise<void> {
    return this.storage.set(TOKEN_KEY, 'Bearer 123456').then( res => {
      console.log('Login Storage Set');
      this.authState$.next(true);
    })
  }

  public logout(): Promise<void> {
    return this.storage.remove(TOKEN_KEY).then( _ => {
      console.log('Login Storage Remove');
      this.authState$.next(false);
    })
  }
  
  public getAuthStateObserver(): Observable<boolean> {

      return this.authState$.asObservable();
    }

  public isAuthenticated(): boolean {
    return !!this.authState$.value;
  }
}
