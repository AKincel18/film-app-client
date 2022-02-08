import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { LoginRequest } from "src/app/payloads/login/LoginRequest";
import { LoginResponse } from "src/app/payloads/login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  response: LoginResponse | undefined;
  constructor(
    private http: HttpClient
  ) { }

  loginUser(request: LoginRequest) {
    this.http
      .post("http://localhost:8080/api/auth/login", request)
      .subscribe(
        (res) => {
          this.response = res as any;
          console.log('OK: id = ' + this.response?.id);
        },
        (err: HttpErrorResponse) => {
          console.error('Error = ' + err.error.detail)
          // this.snackBar.open(err.error.detail, null, {
          //   duration: 5000,
          // });
        }
      );
  }
}
