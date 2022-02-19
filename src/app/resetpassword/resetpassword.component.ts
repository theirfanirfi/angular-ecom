import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    "email": new FormControl("", Validators.required),
  });

  onSubmit() {
    if (this.form.status == "VALID") {
      // let { email, password } = this.form.value;
      this.auth.resetPassword(this.form.value.email)
        .subscribe(data => {
          if (data) {
            alert('Password reset link sent.')
            this.router.navigate(['/login']);
          } else {
            alert('Password reset link sent.')

          }
        }, error => {
          alert('Password reset link sent.')

        });
    } else {
      alert('All fields are required');
    }
  }

}
