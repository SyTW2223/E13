import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user = {
    username: null,
    password: null
  };

  constructor(public authService: AuthService, private location: Location) { }


  ngOnInit() {

  }

  login(): void {
    console.log(this.user)
    this.authService.login(this.user.username, this.user.password).subscribe((res:any) =>{
      console.log(res);
      
      document.cookie = "id=" + res.id+";";
      document.cookie = "token=" + res.token+";";
      document.cookie = "username=" + res.nombre+";";
      document.cookie = "team=" + res.equipo+";";

      let cookies = document.cookie.split(';');
        cookies.forEach(function(cookie) {
        console.log(cookie);
      });
      this.location.back();
    });
  }
}
