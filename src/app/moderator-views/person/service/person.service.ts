import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { CreatePersonRequest } from '../payload/CreatePersonRequest';
import { Person } from '../Person';
import { UpdatePersonRequest } from '../payload/UpdatePersonRequest';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = environment.baseUrl + ApiPaths.PERSONS;
  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  getPaginatedPersons(pageSize: number, pageIndex: number) {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageIndex', pageIndex);
    return this.http.get<Person[]>(this.url, { params: params, observe: 'response' }).pipe(retry(1));
  }

  addEditPerson(id: number | null, form: any, disabledRightPanel: () => void, fetchPersons: () => void) {
    var method = undefined;   
    
    if (id == null) {
      let request = form as CreatePersonRequest;
      method = this.http.post(this.url, request);
    }
    else {
      let request = form as UpdatePersonRequest;
      request.id = id;
      method = this.http.patch(this.url, request);
    }

    method.subscribe(
      {
        next: (res) => {
          var p = res as Person;
          this.snackBar.open('Added '+ p.firstName + ' ' + p.lastName, '', {
            duration: 2000
          })       
          disabledRightPanel();
          fetchPersons();
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

  deletePerson(id: number, disabledRightPanel: () => void, fetchPersons: () => void) {
    var fullUrl = this.url + '/' + id;
    this.http.delete(fullUrl).subscribe(
      {
        next: (res) => {
          this.snackBar.open('Delete!', '', {
            duration: 2000
          })
          disabledRightPanel();      
          fetchPersons();
        }
      }
    )
  }

  getDirectors() {
    var fullUrl = this.url + '/directors';
    return this.http.get<Person[]>(fullUrl).pipe(retry(1));
  }
}
