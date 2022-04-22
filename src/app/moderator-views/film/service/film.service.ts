import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { Film } from '../Film';
import { CreateFilmRequest } from '../payload/CreateFilmRequest';
import { UpdateFilmRequest } from '../payload/UpdateFilmRequest';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  url = environment.baseUrl + ApiPaths.FILMS;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  getPaginatedFilms(pageSize: number, pageIndex: number) {
    let params = new HttpParams()
      .set('size', pageSize)
      .set('page', pageIndex)
      .set('sort', 'name');
    return this.http.get<Film[]>(this.url, { params: params, observe: 'response' }).pipe(retry(1));
  }

  addEditFilm(id: number | null, form: any, disabledRightPanel: () => void, fetchFilms: () => void) {
    var method = undefined;   
    
    if (id == null) {
      let request = form as CreateFilmRequest;
      method = this.http.post(this.url, request);
    }
    else {
      let request = form as UpdateFilmRequest;
      request.id = id;
      method = this.http.patch(this.url, request);
    }

    method.subscribe(
      {
        next: (res) => {
          var f = res as Film;
          this.snackBar.open('Added '+ f.name, '', {
            duration: 2000
          })       
          disabledRightPanel();
          fetchFilms();
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

  deleteFilm(id: number, disabledRightPanel: () => void, fetchFilms: () => void) {
    var fullUrl = this.url + '/' + id;
    this.http.delete(fullUrl).subscribe(
      {
        next: (res) => {
          this.snackBar.open('Delete!', '', {
            duration: 2000
          })
          disabledRightPanel();      
          fetchFilms();
        }
      }
    )
  }
}
