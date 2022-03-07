import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { Dictionary } from '../Dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getDictionaries(path: ApiPaths) {
    return this.http.get<Dictionary[]>(environment.baseUrl + path).pipe(retry(1));
  }

  save(path: ApiPaths, id: number, name: string, disabledPanel: () => void, fetchDictionaries: () => void) {
    var url = environment.baseUrl + path;
    var dictionary = new Dictionary();
    dictionary.setFields(id, name);
    var method = undefined;
    if (id == -1) {
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

  delete(path:ApiPaths, id: number, fetchDictionaries: () => void) {
    var url = environment.baseUrl + path + '/' + id;
    this.http.delete(url).subscribe(
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
