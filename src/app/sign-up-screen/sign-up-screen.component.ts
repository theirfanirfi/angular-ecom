import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';

import{AuthServiceService} from '../services/auth-service.service'
import {UsersService} from '../services/user.service';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css']
})
export class SignUpScreenComponent implements OnInit {


    form = new FormGroup({
            "fullname": new FormControl("", Validators.required),
            "email": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required),
    });

      onSubmit() {

        if (this.form.status == "VALID"){
               this.auth.signUp(this.form.value.email, this.form.value.password).subscribe(data=>{
                 let uid = data.user.uid;
                 let email = this.form.value.email;

                 if(data){
                   this.usersService.addUser({ uid, email, displayName: this.form.value.fullname })
                   this.router.navigate(['/home']);
                 }
               }, 
               error => {
                 alert('Error occurred: ' + error)
               })

        }else {
          alert('All fields are required');
        }
    }
  ngOnInit(): void {
  }

    constructor(private auth: AuthServiceService, private router: Router, private usersService: UsersService) { 
    }

}
