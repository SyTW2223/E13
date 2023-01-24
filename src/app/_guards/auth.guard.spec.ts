import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { expect } from '@jest/globals';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]
      ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
