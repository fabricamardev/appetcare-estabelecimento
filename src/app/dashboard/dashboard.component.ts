import { TokenService } from './../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.tokenService.remove();
    this.tokenService.token = null;
    this.router.navigate(['/login']);
  }

}
