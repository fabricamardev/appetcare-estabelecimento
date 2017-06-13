import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  public check: Boolean = false;

  constructor(private tokenService: TokenService,
              private http: Http,
              private router: Router) {
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

  refresh() {
    const parameters = {
        grant_type: 'password',
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
