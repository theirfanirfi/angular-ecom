import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private auth: AuthServiceService, private router: Router) { }

    form = new FormGroup({
            "email": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required),
    });

        onSubmit() {
        if (this.form.status == "VALID"){
          let {email, password } = this.form.value;
          this.auth.login(email, password)
          .subscribe(data => {
            if(data){
            this.router.navigate(['/home']);
            }else {
            alert('Invalid credentials')
            }
          }, error => {
           alert('Invalid credentials')
          });
        }else {
          alert('All fields are required');
        }
    }
  ngOnInit(): void {
  }

}
