import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service'
import { Payment } from '../models/payment.model'
import { filter, from, map, Observable, of, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  payments: Observable<Payment[]>;
  new_payments: any[] = [];
  constructor(private paymentService: PaymentService) {
    this.payments = this.paymentService.getPurchases();
  }

  ngOnInit(): void {
    this.payments.forEach((payment) => {
      this.new_payments.push(payment);
    })

    console.log(this.new_payments[0]);

  }

  format_date(date: any): string {
    try {
    let seonds = date['seconds'];
    return new Date(seonds).toString();

    } catch (error) {
      return 'NaN'
    }

    
  }

}
