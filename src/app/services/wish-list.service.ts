import { Injectable } from '@angular/core';
import { WishList } from '../models/WishList.model'
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishlist: AngularFirestoreCollection<WishList>;
  wishes: Observable<WishList[]>;


  constructor(
    private angualrFire: AngularFirestore,
    private firestore: Firestore,
    private authService: AuthServiceService) {
    this.wishlist = this.angualrFire.collection<WishList>('wishlist');
    this.wishes = this.wishlist.valueChanges();
  }

  async addToWishList(product_id: number) {
    console.log(product_id)
    let user = this.authService.getUserInfo();
    this.wishlist.add({ product_id: product_id, user_id: user.uid })
  }

  getProductFromWishtList(id: number): Observable<any> {

    return this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id)).valueChanges() as Observable<any>

  }

  async removeFromWishList(id: number) {
    // let d = doc(this.firestore, 'wishes/fdsfds')
    // let d = this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id)
    // this.wishlist.
    // await deleteDoc(doc(this.firestore, "wishlist", ["product_id", id]));
    // deleteDoc(d)
    // this.wishlist.
    // this.angualrFire.collection('wishtlist').doc("ss").delete
  }

  getWishes() {
    return this.wishes;
  }
}
