import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  userType!: string;
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  errorMsg: string = '';

  constructor() {}

  onSubmit() {
    //validation and registration logic
  }

}


