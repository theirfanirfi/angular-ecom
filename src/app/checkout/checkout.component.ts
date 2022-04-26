import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service'
import { TotalpriceService } from '../services/totalprice.service'
import { UsersService } from '../services/user.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total_cart_price: number = 0;
  states_visibility = false;
  constructor(private cartservice: CartService,
    private totalprice: TotalpriceService,
    private router: Router, private userService: UsersService) { }

  form = new FormGroup({
    "firstname": new FormControl("", Validators.required),
    "lastname": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "phonenumber": new FormControl("", Validators.required),
    "country_name": new FormControl("", Validators.required),
    "state_province": new FormControl(""),
    "address": new FormControl("", Validators.required),
    "postal_code": new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.total_cart_price = this.totalprice.getTotalPrice();
    this.userService.currentUserProfile$.subscribe(data => {
      if (data != null) {
        this.form.setValue({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          phonenumber: data.phone,
          country_name: data.country,
          state_province: data.state,
          address: data.address,
          postal_code: data.postal_code
        });
      }
    });


  }

  onChangeCountry(e: any): void {
    if (e.target.value == "USA") {
      this.states_visibility = true;
    } else {
      if (this.states_visibility) {
        this.states_visibility = false;
      }
    }
  }

  submit() {
    if (this.form.valid) {
      this.router.navigate(['payment']);
    } else {
      alert("all fields are required");
    }
  }

  get email() {
    return this.form.get('email');
  }

}
