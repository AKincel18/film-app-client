import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../payloads/login/LoginRequest';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  request: LoginRequest = {};
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  onLoginBtnClicked() {
    this.request.password = this.password;
    this.request.username = this.username;
    this.loginService.loginUser(this.request);
  }


}
