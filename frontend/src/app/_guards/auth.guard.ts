import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if(!this.authService.isAuth()) {
      this.router.navigate(['/login']);
      console.log("Token expirado o no válido")
      return false;
    } else {
      return true;
    }
  }
  
}
