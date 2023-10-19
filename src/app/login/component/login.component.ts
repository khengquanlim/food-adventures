import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};

  onSubmit() {
    // Add your login logic here
    console.log('Login button clicked');
    console.log('Username: ' + this.model.username);
    console.log('Password: ' + this.model.password);
  }
}
