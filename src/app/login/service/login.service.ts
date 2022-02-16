import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from "src/app/MessageResponse";
import { LoginRequest } from "src/app/login/payload/LoginRequest";
import { User } from "src/app/login/payload/User";
import { environment } from "src/environments/environment";
import { ApiPaths } from "src/enums/ApiPaths";
import { LocalStorageService } from "src/app/localstorage/localstorage.service";
import { RegisterRequest } from "../payload/RegisterRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
  ) { }

  loginUser(request: LoginRequest) {
    var url = environment.baseUrl + ApiPaths.LOGIN;
    this.http
      .post(url, request)
      .subscribe( {
        next: (res) => {
          this.localStorageService.setUser(res as User);
          console.log(JSON.stringify(this.localStorageService.getUser()));
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

  registerUser(request: RegisterRequest) {
    var url = environment.baseUrl + ApiPaths.REGISTER;
    this.http
    .post(url, request)
    .subscribe( {
      next: (res) => {
        var response = res as MessageResponse;
        this.snackBar.open(response.message, '', {
          duration: 5000
        })  
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
