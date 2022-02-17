import { Injectable } from '@angular/core';
import { User } from '../login/payload/User';

const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUser(): User {
    var user = JSON.parse(localStorage.getItem(USER) as string) as User;
    return user;
  }

  setUser(user: User) {
    localStorage.setItem(USER, JSON.stringify(user));
  }
}
