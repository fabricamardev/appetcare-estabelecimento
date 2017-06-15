import { AppetAuthService } from './appet-auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuardRouterService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.check) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  constructor(private auth: AppetAuthService,
    private router: Router) { }

}
