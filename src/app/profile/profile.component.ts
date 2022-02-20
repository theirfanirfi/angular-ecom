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
  messages: string[][] = [];

  Nameform = new FormGroup({
    "displayName": new FormControl("", Validators.required,),
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
      const profileData = this.Nameform.value;
      this.messages = [];
      this.userservice.updateUser(profileData, user.uid)
        .subscribe(
          data => {
            console.log(data);
            // alert('Name updated successfully');
            this.messages.push(["success", "Full Name updated successfully"]);
          },
          error => {
            console.log('error: ', error);
            // alert('Error occurred, please try again');
          })
    } else {
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
      }
    });
    // this.auth.resetPassword();
  }

}
