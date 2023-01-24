import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../_services/auth.service';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { expect } from '@jest/globals';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientModule, FormsModule]
      ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 
  it('should log the user', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    component.register();

    expect(consoleSpy).toHaveBeenCalledWith(component.user);
  });

  
});
