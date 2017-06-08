/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardRouterService } from './auth-guard-router.service';

describe('AuthGuardRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardRouterService]
    });
  });

  it('should ...', inject([AuthGuardRouterService], (service: AuthGuardRouterService) => {
    expect(service).toBeTruthy();
  }));
});
