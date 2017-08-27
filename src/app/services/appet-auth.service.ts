import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenService } from '../services/token.service';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { LocalStorageService } from './local-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'angular2-social-login';
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppetAuthService implements OnDestroy {

  public check: Boolean = false;
  public isSocial: Boolean = false;
  sub: any;
  public socialUser;
  user: any;

  api_route: string = environment.api_address + environment.api_version + 'estabelecimentos' + '?where[email]=';

  constructor(private tokenService: TokenService,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public _auth: AuthService,
    public requestOptions: DefaultRequestOptionsService,
    public localStorageService: LocalStorageService) {
    this.check = this.tokenService.token ? true : false;
  }

  login(redirectAfterLogin, user) {
    return new Promise((resolve, reject) => {
      this.user = user;
      this.http
        .post(environment.oauth_url, this.user)
        .toPromise()
        .then(response => {
          this.check = true;
          this.tokenService.token = response.json();
          this.http // email enviado ao oauth para obter token
            .get(this.api_route + this.user.username, this.requestOptions.merge(new RequestOptions()))
            .toPromise()
            .then(estabelecimento => {
              this.localStorageService.setObject('estabelecimento', estabelecimento.json().result[0]);
              this.router.navigate(redirectAfterLogin);
              resolve();
            });
        })
        .catch(error => reject(error));
    });
  }

  signIn(provider) {
    return new Promise((resolve, reject) => {
      this.sub = this._auth.login(provider)
        .subscribe(
        (data) => {
          this.localStorageService.setObject('social', data);
          this.isSocial = true;
          this.check = true;
          resolve(data);
        },
        error => reject(error)
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  refreshToken() {
    const parameters = {
      grant_type: 'refresh_token',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refresh_token: this.tokenService.token.refresh_token
    };

    this.http
      .post(environment.oauth_url, parameters)
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
    return new Promise((resolve, reject) => {
      this.check = false;
      this.tokenService.remove();
      this.localStorageService.remove('estabelecimento');
      this.tokenService.token = null;

      if (this.isSocial) {
        this.localStorageService.remove('social');
        this._auth.logout().subscribe(
          (data) => {
            this.socialUser = null;
            resolve(data);
          },
          error => reject(error)
        );
      }

      resolve();
    });
  }
}
