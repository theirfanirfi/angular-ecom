import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../services/user.service';
import { ProfileUser } from '../models/User.model'
import { AuthServiceService } from '../services/auth-service.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$ = this.auth.getUserInfo();
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  photoURL?: string;
  country?: string;
  state?: string;
  postal_code?: string;

  messages: string[][] = [];
  states_visibility = false;

  onChangeCountry(e: any): void {
    if (e.target.value == "USA") {
      this.states_visibility = true;
    } else {
      if (this.states_visibility) {
        this.states_visibility = false;
      }
    }
  }

  Nameform = new FormGroup({
    // "displayName": new FormControl("", Validators.required,),
    "uid": new FormControl(""),
    "displayName": new FormControl(""),
    "email": new FormControl(""),
    "firstName": new FormControl("", Validators.required,),
    "lastName": new FormControl("", Validators.required,),
    "phone": new FormControl("", Validators.required,),
    "address": new FormControl("", Validators.required,),
    "country": new FormControl("", Validators.required,),
    "state": new FormControl(""),
    "postal_code": new FormControl("", Validators.required,),
  });


  Emailform = new FormGroup({
    "email": new FormControl("", Validators.required),
  });

  Passwordform = new FormGroup({
    "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  constructor(private userservice: UsersService, private auth: AuthServiceService) {
    console.log('user: ', this.user$);

  }

  changeName(event: any, user: ProfileUser): void {
    if (this.Nameform.status == "VALID") {
      const profileData: ProfileUser = this.Nameform.value;
      profileData.displayName = this.Nameform.value.firstName + ' ' + this.Nameform.value.lastName
      this.messages = [];
      this.userservice.updateUser(profileData, user.uid)
        .subscribe(
          data => {
            console.log(data);
            // alert('Name updated successfully');
            this.messages.push(["success", "Profile updated successfully"]);
          },
          error => {
            console.log('error: ', error);
            // alert('Error occurred, please try again');
          })
    } else {
      console.log(this.Nameform.value);
      alert('All fields are required');
    }

    // this.messages.concat(this.auth.updateEmailAndPassword(this.form.value.email, this.form.value.password));
    // console.log(this.messages);
  }

  changeEmail(event: any, user: ProfileUser): void {
    this.messages = [];
    this.messages = this.auth.updateEmaill(this.Emailform.value.email);
  }
  changePassword(event: any, user: ProfileUser) {
    this.messages = [];
    this.messages = this.auth.updatePasswordd(this.Passwordform.value.password);
  }
  async ngOnInit(): Promise<void> {
    this.user$ = await this.auth.getUserInfo();
    this.userservice.currentUserProfile$.subscribe(data => {
      if (data != null) {
        this.displayName = data.displayName;
        this.email = this.user$.email;
        if (data.state != "") {
          this.states_visibility = true;
        }

        this.Nameform.setValue(data);
      }
    });
    // this.auth.resetPassword();
  }

  get firstNamee() {
    return this.Nameform.get('firstName');
  }

  get lastNamee() {
    return this.Nameform.get('lastName');
  }

  get phonee() {
    return this.Nameform.get('phone');
  }

  get addresss() {
    return this.Nameform.get('address');
  }
  get postalCode() {
    return this.Nameform.get('postal_code');
  }

  get countryy() {
    return this.Nameform.get('country');
  }
  get statee() {
    return this.Nameform.get('state');
  }

}
