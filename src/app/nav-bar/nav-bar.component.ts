import { TokenService } from './../services/token.service';
import { Estabelecimento } from '../perfil/estabelecimento';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppetAuthService } from './../services/appet-auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router,
    private auth: AppetAuthService) { }

  ngOnInit() {
  }


  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}
