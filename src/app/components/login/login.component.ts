import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../payloads/login/LoginRequest';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

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


}
