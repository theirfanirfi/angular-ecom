import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/User.model';
import { AuthServiceService } from './auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //  private usersCollection: AngularFirestoreCollection<ProfileUser>;
  // user: Observable<ProfileUser[]>;

  constructor(private firestore: Firestore, private authService: AuthServiceService) {
    // this.usersCollection = afs.collection<ProfileUser>('users');
    // this.user = this.usersCollection.valueChanges();
  }

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  //   addItem(item: ProfileUser) {
  //   this.usersCollection.add(item);
  // }

  async addUser(user: ProfileUser): Promise<any> {
    let uid = "dfsd"
    const ref = doc(this.firestore, 'users', uid);
    return from(setDoc(ref, user));
  }

  async addUserr(user: ProfileUser, uid: string): Promise<any> {
    const ref = doc(this.firestore, 'users', uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser, uid: string): Observable<void> {
    const ref = doc(this.firestore, 'users', uid);
    return from(updateDoc(ref, { ...user }));
  }

  async getUser(uid: string): Promise<any> {
    const ref = doc(this.firestore, 'users', uid);
    console.log(collection(this.firestore, 'users'));
    return from(getDoc(ref));
  }
}
