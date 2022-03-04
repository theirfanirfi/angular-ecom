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
    "cardnumber": new FormControl("", Validators.required),
    "expiry_month": new FormControl("", Validators.required),
    "expiry_year": new FormControl("", Validators.required),
    "cvc": new FormControl("", Validators.required),
  });

  constructor(private router: Router,
    private paymentService: PaymentService,
    private totalprice: TotalpriceService,
    private cart: CartService) {
    this.total_price = this.totalprice.getTotalPrice();
  }

  ngOnInit(): void {
  }

  confirmPayment() {
    console.log(this.form.value)
    if (this.form.status == "VALID") {
      let pay: Payment = this.form.value;
      pay.price = this.total_price
      pay.payment_date = new Date();
      this.paymentService.addPayment(pay);
      alert('Payment confirmed. Thank you for shopping.');
      this.cart.resetCart();
      this.router.navigate(['home']);
    } else {
      alert('All fields are required');
    }
  }

}
