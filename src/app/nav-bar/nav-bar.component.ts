import { TokenService } from './../services/token.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

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
