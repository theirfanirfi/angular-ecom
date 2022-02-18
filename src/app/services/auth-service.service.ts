import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  updateCurrentUser,
  getAuth,
  updateEmail,
} from '@angular/fire/auth';
import { userInfo } from 'os';

import { concatMap, from, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  currentUser$ = authState(this.auth);


  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
    logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getUserInfo(): any{
    var user = this.auth.currentUser;
    console.log(user);
    // updateCurrentUser(this.auth, {email: "some email"})
    console.log(getAuth().currentUser);
    // return userInfo();
  }

  // updateUserEmail(email: string): Observable<any> {
  //   const auth = getAuth();
  //   auth.updateCurrentUser({
  //   });
//     return from(this.auth.currentUser.updateProfile({
//   displayName: "Updated User's Name",
//   photoURL: "https://example.com/user/profile.jpg"
// }));
  
  // }
}
