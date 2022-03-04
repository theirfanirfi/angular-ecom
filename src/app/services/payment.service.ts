import { Injectable } from '@angular/core';
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
import { Payment } from '../models/payment.model'


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentCollection: AngularFirestoreCollection<Payment>;
  payments: Observable<Payment[]>;
  user: any = []
  constructor(private angualrFire: AngularFirestore,
    private firestore: Firestore,
    private authService: AuthServiceService) {

    this.paymentCollection = this.angualrFire.collection<Payment>('payment');
    this.payments = this.paymentCollection.valueChanges();
    this.user = this.authService.getUserInfo();
  }

  async addPayment(payment: Payment) {
    this.paymentCollection.add(payment);

  }
}
