import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service'
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css']
})
export class SignUpScreenComponent implements OnInit {

  states_visibility = false;
  form = new FormGroup({
    "firstname": new FormControl("", Validators.required),
    "lastname": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "phonenumber": new FormControl("", Validators.required),
    "country_name": new FormControl("", Validators.required),
    "state_province": new FormControl(""),
    "address": new FormControl("", Validators.required),
    "postal_code": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });

  onSubmit() {

    if (this.form.status == "VALID") {
      console.log(this.form.value);
      this.auth.signUp(this.form.value.email, this.form.value.password).subscribe(data => {
        let uid = data.user.uid;
        let email = this.form.value.email;

        if (data) {
          this.usersService.addUser({
            uid, email,
            firstName: this.form.value.firstname,
            lastName: this.form.value.lastname,
            displayName: this.form.value.firstname,
            phone: this.form.value.phonenumber,
            address: this.form.value.address,
            country: this.form.value.country_name,
            state: this.form.value.state_province,
            postal_code: this.form.value.postal_code,


          })
          this.router.navigate(['/home']);
        }
      },
        error => {
          alert('Error occurred: ' + error)
        })

    } else {
      alert('All fields are required');
    }
  }
  ngOnInit(): void {
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

  get email() {
    return this.form.get('email');
  }

  constructor(private auth: AuthServiceService, private router: Router, private usersService: UsersService) {
  }

}
