import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]
    ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
