import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from 'src/enums/UserRole';
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
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  signInAction() {
    if (this.username != '' && this.password != '') {
      this.loginService.loginUser(new LoginRequest(this.username, this.password));
    }
  }

  signUpAction() {
    //this.activeTab = 0;
    this.loginService.registerUser(new RegisterRequest(this.username, this.email, this.password, UserRole.ROLE_USER));
  }


}
