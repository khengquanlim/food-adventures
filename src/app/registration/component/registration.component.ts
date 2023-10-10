import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', [Validators.required, this.userTypeValidator]], 
      registeredUserName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      birthdate: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  userTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const userType = control.value;
    if (userType === 'diner' || userType === 'restaurantOwner') {
      console.log("select diner or restaurantOwner");
      return null; 
    } else {
      console.log("userTypeInvalid");
      return { 'userTypeInvalid': true }; 
    }
  }
  
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmitRegisterForm() {
    if (this.registrationForm.valid) {
      const birthdateControl = this.registrationForm.get('birthdate');
      if (birthdateControl) {
        const birthdate = new Date(birthdateControl.value);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
  
        if (age < 18) {
          alert('You must be at least 18 years old to register.');
        } else {
          this.registrationForm.reset();
          console.log(this.registrationForm.value);
          console.log("submitted");
        }
      }
    }
  }  

  get userType() {
    return this.registrationForm.get('userType');
  }

  get registeredUserName() {
    return this.registrationForm.get('registeredUserName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get birthdate() {
    return this.registrationForm.get('birthdate');
  }
}
