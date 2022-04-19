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
  user: any = [];
  wishlist_products: any = [];
  isProduct: any = [];
  constructor(
    private angualrFire: AngularFirestore,
    private firestore: Firestore,
    private authService: AuthServiceService) {
    this.wishlist = this.angualrFire.collection<WishList>('wishlist');
    this.wishes = this.wishlist.valueChanges();
    this.user = this.authService.getUserInfo();
  }

  async addToWishList(product_id: number) {
    var wi = this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', product_id)).get();
    await wi.forEach(async (w) => {
      w.forEach(i => {
        let docRef = doc(this.firestore, `wishlist/${i.id}`);
        deleteDoc(docRef);
      })

    })

    // this.wishlist_products.push(product_id);
    this.wishlist.add({ product_id: product_id, user_id: this.user.uid })


  }

  getProductFromWishtList(id: number): Observable<any> {

    return this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id).where('user_id', '==', this.user.uid)).valueChanges() as Observable<any>

  }

  getProductFromWishtListForHeart(id: any): number {
    let b = false;
    let size = 0;
    // var wi = this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id));
    var wi = this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id));

    wi.get().forEach((w) => {

      if (w.size > 0) {
        size = w.size;
        b = true;
      }
    });

    return size;
  }

  async removeFromWishList(id: number) {
    var wi = this.angualrFire.collection<WishList>('wishlist', ref => ref.where('product_id', '==', id)).get();
    wi.forEach((w) => {
      w.forEach(i => {
        let docRef = doc(this.firestore, `wishlist/${i.id}`);
        deleteDoc(docRef);
      })
    })
  }

  getWishes() {
    return this.wishes;
  }


}
