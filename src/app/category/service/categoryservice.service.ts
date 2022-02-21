import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { Category } from '../Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { 
    this.url = environment.baseUrl + ApiPaths.CATEGORIES;
  }

  getCategory() {
    return this.http.get<Category[]>(this.url).pipe(retry(1));
  }

  saveEditCategory(id: number, name: string, disabledPanel: () => void, fetchCategories: () => void) {
    var category = new Category(id, name);
    var method = undefined;
    if (id == null!) {
      method = this.http.post(this.url, category);
    }
    else {
      method = this.http.put(this.url, category);
    }
    
    method.subscribe(
      {
        next: (res) => {
          var category = res as Category;
          this.snackBar.open('Added '+ category.name +' category!', '', {
            duration: 2000
          })       
          disabledPanel();
          fetchCategories();
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

  deleteCategory(id: number, fetchCategories: () => void) {
    this.http.delete(this.url + '/'+ id).subscribe(
      {
        next: (res) => {
          this.snackBar.open('Delete category!', '', {
            duration: 2000
          })      
          fetchCategories();
        }
      }
    )
  }
}
