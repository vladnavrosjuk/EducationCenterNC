import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import {from, Observable, ReplaySubject} from "rxjs";
import AuthProvider = firebase.auth.AuthProvider;
import {FireBaseUser, UserCredential} from '../types'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public  user$: ReplaySubject<FireBaseUser> = new ReplaySubject(1);

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user: FireBaseUser) => this.user$.next(user));
  }

  public googleSignIn(): Observable<UserCredential> {
    return this.authWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  public authWithPopup(provider: AuthProvider): Observable<UserCredential> {
    return from(this.afAuth.signInWithPopup(provider));
  }
}
