import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'src/app/common/CommonConstant';
import { ModalService} from "../../common/modal.service";
import { Router } from '@angular/router';
import {LoginResponse} from '../../core/models/loginResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  credentials: any = {};
  emailError: boolean | undefined;
  passwordError: boolean | undefined;

  private baseUrl = 'http://localhost:8082/foodAdventures';

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService){
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]],
        password: ['', Validators.required],
      });
    }
  
  onSubmit() {
    // Add your login logic here
    // const loginUrl = `${this.baseUrl}/login`;
    if (this.loginForm.valid) {
      
      this.emailError = false;
      this.passwordError = false;

      const loginData = {
        email: this.credentials.email,
        password: this.credentials.password
      };
      console.log("login data", loginData);
      this.http.post<LoginResponse>(CommonConstant.authenticationBaseUrl + '/login', loginData).subscribe(
    // this.http.post(loginUrl, loginData).subscribe(
      (response) => {
          // Handle the successful login response
          console.log('Login successful:', response);
          this.router.navigateByUrl('/user-profile');
          const data = response.data;
          const userType = data.userType;
          const userId = data.id;
          console.log('Login successful:', userType);
          if (userType === 'diner') {
            this.router.navigate(['/user-profile', userId]);
          } else if (userType === 'restaurant') {
            this.router.navigate(['/restaurant-owner-profile', userId]);
          }
          // Redirect to the user's dashboard or perform any other actions
      },
      (error) => {
          // Handle login failure or errors
          // console.error('Login failed:', error);
          // this.modalService.showModal(error.error.description, '', '');
          // Display an error message to the user
  
          console.error('Login failed:', error);
          if (error.error && error.error.description) {
            // Display the custom error message from the server
            this.modalService.showModal(error.error.description, 'OK', 'red'); // Customize button text and color as needed
          } else {
            // Display a generic error message
            this.modalService.showModal('An error occurred during login.', 'OK', 'red'); // Customize text and color
          }
      });
    }else{
      this.emailError = this.loginForm.get('email')?.hasError('required');
      this.passwordError = this.loginForm.get('password')?.hasError('required');
    }
    
  }

  routeRegister(){
    this.router.navigateByUrl('/register');
  }
}
