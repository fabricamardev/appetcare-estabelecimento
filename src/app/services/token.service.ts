import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable()
export class TokenService {

  constructor(private localStorage: LocalStorageService) { }

  set token(value) {
    value ? this.localStorage.setObject(TOKEN_KEY, value) : this.localStorage.remove(TOKEN_KEY);
  }

  get token() {
    return this.localStorage.getObject(TOKEN_KEY);
  }

  remove() {
    this.localStorage.remove(TOKEN_KEY);
  }
}
