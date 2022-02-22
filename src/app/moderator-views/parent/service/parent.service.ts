import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { Dictionary } from '../Dictionary';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  get(url: string) {
    return this.http.get<Dictionary[]>(url).pipe(retry(1));
  }

  save(url: string, id: number, name: string, disabledPanel: () => void, fetchDictionaries: () => void) {
    var dictionary = new Dictionary(id, name);
    var method = undefined;
    if (id == null!) {
      method = this.http.post(url, dictionary);
    }
    else {
      method = this.http.put(url, dictionary);
    }
    
    method.subscribe(
      {
        next: (res) => {
          var dictionary = res as Dictionary;
          this.snackBar.open('Added '+ dictionary.name, '', {
            duration: 2000
          })       
          disabledPanel();
          fetchDictionaries();
        },
        error: (e) => {
          if (e instanceof HttpErrorResponse) {
            var response = e.error as MessageResponse;
            this.snackBar.open(response.message, '', {
              duration: 2000
            })            
          }
        }
      }
    )
  }

  delete(url: string, id: number, fetchDictionaries: () => void) {
    this.http.delete(url + '/'+ id).subscribe(
      {
        next: (res) => {
          this.snackBar.open('Delete!', '', {
            duration: 2000
          })      
          fetchDictionaries();
        }
      }
    )
  }
}
