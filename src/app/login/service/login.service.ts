import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from "src/app/MessageResponse";
import { LoginRequest } from "src/app/login/payload/LoginRequest";
import { LoginResponse } from "src/app/login/payload/LoginResponse";
import { environment } from "src/environments/environment";
import { ApiPaths } from "src/enums/ApiPaths";

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
    var url = environment.baseUrl + ApiPaths.LOGIN;
    this.http
      .post(url, request)
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
