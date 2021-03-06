import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../_models';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // User observable object
  user$: Observable<any>;

  constructor(
    // Angular Firestore Authorization API
    private afAuth: AngularFireAuth,
    // Angular Firestore API
    private afs: AngularFirestore,
    // Angular Router Object
    private router: Router,
    // State Service
    private state: StateService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.state.changeCurrentUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Sign in with Google Method
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // Signout sequence method
  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/home']);
  }

  // Update user data if is authenticated and only if id is the same on Data Base
  private updateUserData(user : firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      phone: user.phoneNumber,
      photo: user.photoURL,
      questions: []
    };

    return userRef.set(data, { merge: true });
  }
}