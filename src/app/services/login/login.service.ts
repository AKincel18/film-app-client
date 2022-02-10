import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from "src/app/MessageResponse";
import { LoginRequest } from "src/app/payloads/login/LoginRequest";
import { LoginResponse } from "src/app/payloads/login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  response : LoginResponse | undefined;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  loginUser(request: LoginRequest) {
    this.http
      .post("http://localhost:8080/api/auth/login", request)
      .subscribe( {
        next: (res) => {
          this.response = res as LoginResponse;
          console.log('success: id = ' + this.response?.id);
        },
        error: (e) => {
          if (e instanceof HttpErrorResponse) {
            var response = e.error as MessageResponse;
            this.snackBar.open(response.message, '', {
              duration: 5000
            })            
          }

      }
      });
  }
}
