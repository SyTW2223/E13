import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto';
  username ="";

  ngOnInit() {
      let cookies = document.cookie.split(';');
      let usernameCookie = cookies.find(cookie => cookie.startsWith(" username="));
      this.username = usernameCookie.substring(10);
      window.addEventListener('storage', (event) => {
      if(event.key === ' username') {
        this.username = event.newValue;
      }
    });
  }

}
