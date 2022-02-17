import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MyErrorStateMatcher } from 'src/classes/MyErrorStateMatcher';
import { LoginRequest } from '../payload/LoginRequest';
import { RegisterRequest } from '../payload/RegisterRequest';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  activeTab = 0;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generateLoginForm();
    this.generateRegisterForm();
  }

  signInAction() {
    const request = this.loginForm.value as LoginRequest;
    this.loginService.loginUser(request);
  }

  signUpAction() {
    const changeTab = () => (this.activeTab = 0);
    const request = this.registerForm.value as RegisterRequest;
    this.loginService.registerUser(request, changeTab);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.registerForm.reset();
    }
    else {
      this.loginForm.reset();
    }
  }

  private generateLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    );

  }

  private generateRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email
          ],
        ),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_,\.])[A-Za-z\d@$!%*#?&-_,\.]{5,64}/
            ),
          ]),
        confirmPassword: new FormControl('', [Validators.required]),
        validator: this.repeatPasswordValidator //todo
      }
    );

  }

  repeatPasswordValidator: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let password = group.get('password');
    let passwordConfirmation = group.get('confirmPassword');
    if (password?.value !== passwordConfirmation?.value) {
      passwordConfirmation?.setErrors({ passwordsNotEqual: true });
    }
    else {
      passwordConfirmation?.setErrors(null);
    }
    return null;
  }

}
