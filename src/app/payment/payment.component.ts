import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model'
import { TotalpriceService } from '../services/totalprice.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  total_price: number = 0;
  form = new FormGroup({
    "fullname": new FormControl("", Validators.required),
    "cardnumber": new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(19),
    Validators.pattern('^[0-9]+$')]),
    "expiry_month": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[0-9]+$')]),
    "expiry_year": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[0-9]+$')]),
    "cvc": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]+$')]),
  });

  constructor(private router: Router,
    private paymentService: PaymentService,
    private totalprice: TotalpriceService,
    private cart: CartService) {
    this.total_price = this.totalprice.getTotalPrice();
  }

  ngOnInit(): void {

  }

  getTodayDate(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  confirmPayment() {


    if (this.form.status == "VALID") {
      let pay: Payment = this.form.value;
      pay.price = this.total_price
      pay.payment_date = this.getTodayDate()
      pay.total_items = this.cart.getTotalProductsInCart();
      this.paymentService.addPayment(pay);
      alert('Payment confirmed. Thank you for shopping.');
      this.cart.resetCart();
      this.router.navigate(['home']);
    } else {
      alert('All fields are required');
    }
  }

  get fullname() {
    return this.form.get('fullname');
  }

  get cardnumber() {
    return this.form.get('cardnumber');
  }

  get expiry_month() {
    return this.form.get('expiry_month');
  }

  get expiry_year() {
    return this.form.get('expiry_year');
  }

  get cvc() {
    return this.form.get('cvc');
  }

}
