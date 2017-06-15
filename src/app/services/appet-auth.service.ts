import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppetAuthService implements OnDestroy {

  public check: Boolean = false;
  sub: any;
  public socialUser;

  constructor(private tokenService: TokenService,
              private http: Http,
              private router: Router,
              public _auth: AuthService) {
    this.check = this.tokenService.token ? true : false;
  }

  login(redirectAfterLogin, user) {
    this.http
      .post('http://localhost:8000/oauth/token', user)
      .toPromise()
      .then(response => {
        this.check = true;
        this.tokenService.token = response.json();
        this.router.navigate(redirectAfterLogin);
      })
      .catch((error: any) => {
        if (error.status === 500) {
          console.log('Erro interno');
        }
      });
  }

  signIn(provider, redirectAfterLogin) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data); this.socialUser = data;
        this.router.navigate(redirectAfterLogin);
      }
    );
  }

  logoutSocial() {
    this._auth.logout().subscribe(
      (data) => { console.log(data); this.socialUser = null; }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  refreshToken() {
    const parameters = {
        grant_type: 'refresh_token',
        client_id: '1',
        client_secret: 'ptmalrhUcINWGl0HyMM0Ji6IG5xGC6F7SshLKrWF',
        refresh_token: ''
    };

    this.http
      .post('http://localhost:8000/oauth/token', parameters)
      .toPromise()
      .then(response => {
        this.tokenService.token = response.json();
      })
      .catch((error: any) => {
        if (error.status === 500) {
          console.log('Erro interno');
        }
      });
  }

  logout() {
    this.tokenService.remove();
    this.tokenService.token = null;
  }
}
