import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: null,
    password: null
  };

  constructor(public authService: AuthService, public router: Router) { }


  ngOnInit() {

  }

  register(): void {
    console.log(this.user)
    this.authService.register(this.user.username, this.user.password).subscribe((res:any) =>{
      console.log(res);
    });
    this.router.navigate(['/login']);
  }
  
}