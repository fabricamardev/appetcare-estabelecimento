import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public check: Boolean = false;
  constructor(private tokenService: TokenService) {
    this.check = this.tokenService.token ? true : false;
  }

}
