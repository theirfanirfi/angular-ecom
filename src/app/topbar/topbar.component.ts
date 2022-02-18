import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserInfo()
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
