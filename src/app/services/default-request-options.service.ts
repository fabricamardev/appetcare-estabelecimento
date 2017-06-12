import { TokenService } from './token.service';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultRequestOptionsService extends RequestOptions {

  constructor(private tokenService: TokenService) {
    super();
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    let headers = options.headers || new Headers();
    headers.set('Authorization', `Bearer ${this.tokenService.token['access_token']}`);
    headers.set('Content-Type', 'application/json');
    options.headers = headers;
    return super.merge(options);
  }

}
