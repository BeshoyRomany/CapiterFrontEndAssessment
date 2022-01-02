import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthModel } from 'src/app/modules/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  subscriptions: Subscription[] = [];
  loginInfo: AuthModel = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  ngOnInit(): void {
    //Check User Authentication
    this.checkUserAuth();
    //Check Validation
    this.userValidation();
  }

  //Check User Authentication
  checkUserAuth() {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/']);
    }
  }
  //user form validation
  userValidation() {
    this.userLoginForm = this.formBuilder.group({
      email: [this.loginInfo.email, [Validators.required, Validators.email]],
      password: [this.loginInfo.password, Validators.required],
    });
  }
  //Form Validation controls
  get f() {
    return this.userLoginForm.controls;
  }
  //User Login
  login() {
    if (this.userLoginForm.valid) {
      const formData = {
        email: this.userLoginForm.value.email,
        password: this.userLoginForm.value.password,
      };
      this.authService.login(formData).subscribe(
        (data) => {
          if (data) {
            this.authService.showMessage(
              'You are successfully logged in',
              'success'
            );
            this.tokenStorage.saveToken(data.token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authService.showMessage(
            'Please enter a valid Email and Password',
            'error'
          );
        }
      );
    }
  }
}
