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
  updatePassword,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { userInfo } from 'os';
import { ProfileUser } from '../models/User.model';
import { UsersService } from '../services/user.service'

import { concatMap, from, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  currentUser$ = authState(this.auth);


  constructor(private auth: Auth) { }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getUserInfo(): any {
    var user = this.auth.currentUser;
    // console.log(user);
    // updateCurrentUser(this.auth, {email: "some email"})
    // console.log(getAuth().currentUser);
    // return userInfo();
    return getAuth().currentUser;
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

  // get currentUserProfile$(): Observable<ProfileUser | null> {
  //   return this.currentUser$.pipe(
  //     switchMap((user) => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }

  //       updateEmail(user, "newW@ne.com");
  //     })
  //   );
  // }

  updateProfilee(profileData: ProfileUser): any {




    // updateEmail({ ...this.auth.currentUser }, "ememem")

    // updateProfile(this.currentUser$, profileData);
    // const user = this.auth.currentUser;
    // console.log(user);
    // return of(user).pipe(
    //   concatMap((user) => {
    //     if (!user) throw new Error('Not authenticated');

    //     return updateProfile(user, profileData);
    //   })
    // );
  }

  updatePasswordd(password: string): string[][] {
    let response_messages: string[][] = []
    const user = this.currentUser$.subscribe(data => {
      if (data != null) {
        updatePassword(data, password).then((pass) => {
          console.log('password updated');
          response_messages.push(["success", "Password Updated."]);
        }).catch((err) => {
          console.log('password not updated');

          response_messages.push(["error", "Password Error: " + err.message]);
        })
      }
    })

    return response_messages;
  }

  updateEmaill(email: string): string[][] {
    let response_messages: string[][] = []
    const user = this.currentUser$.subscribe(data => {
      if (data != null) {
        updateEmail(data, email).then((profile) => {
          console.log("email updated");
          response_messages.push(["success", "Email Updated."]);
        }).catch((err) => {
          console.log("email not updated ", err);

          response_messages.push(["error", "Email Error: " + err.message]);
        });
      }
    });
    return response_messages;
  }

  resetPassword(email: string): Observable<any> {

    return from(sendPasswordResetEmail(this.auth, email, {
      url: 'http://localhost:4200/?email=user@example.com',
    }));
  }
}
