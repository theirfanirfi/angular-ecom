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

  form = new FormGroup({
    "displayName": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });
  constructor(private userservice: UsersService, private auth: AuthServiceService) {
    console.log('user: ', this.user$);

  }
  onSubmit(event: any, user: ProfileUser) {
    // this.userservice.addUser(this.form.value)
    // console.log(this.auth.updateProfile(this.form.value));
    console.log(this.userservice.addUserr(this.form.value, user.uid));
    // if (this.form.status == "VALID"){
    //   let {fullname, email, password } = this.form.value;
    //    const profileData = this.form.value;
    //    console.log(profileData);

    //    this.userservice.updateUser(profileData)
    //    .subscribe(
    //      data => {
    //      console.log(data);
    //    }, 
    //    error => {
    //      console.log('error: ', error);
    //    })
    // }else {
    //   alert('All fields are required');
    // }
  }
  ngOnInit(): void {
    // this.user$ = await this.auth.getUserInfo();
    // console.log(this.userservice.getUser(this.user$.uid));
    // this.auth.resetPassword();
  }

}
