import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

import { CommonConstant } from 'src/app/common/CommonConstant';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  hasError:boolean = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', [Validators.required, this.userTypeValidator]],
      userId: ['', Validators.required],
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
      const password = this.registrationForm.get('password')?.value;

      if (birthdateControl) {
        const birthdate = new Date(birthdateControl.value);
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();

        if (age < 18) {
          alert('You must be at least 18 years old to register.');
          this.registrationForm.reset();
        } else {
          if (password) {
            bcrypt.hash(password, 10, (err: Error | null, hash: string | undefined) => {
              if (err) {
                console.error('Password hashing error: ', err);
              } else {
                const formData = {
                  userType: this.userType?.value,
                  userId: this.userId?.value,
                  email: this.email?.value,
                  password: hash,
                  age: age,
                };
                console.log('formData:', formData);
                this.http.post(CommonConstant.baseUrl + '/register', formData).subscribe(
                  (response) => {
                    console.log('Registration successful:', response);
                    this.hasError = false;
                    this.registrationForm.reset();
                    this.router.navigateByUrl('/login');
                  },
                  (error) => {
                    console.log('Registration error:', error);
                    this.hasError = true;

                  }
                );
              }
            });
          }
          console.log(this.registrationForm.value);
          console.log("submitted");
        }
      }
    }
  }

  get userType() {
    return this.registrationForm.get('userType');
  }

  get userId() {
    return this.registrationForm.get('userId');
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
