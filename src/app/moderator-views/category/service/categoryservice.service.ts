import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, retry } from 'rxjs';
import { MessageResponse } from 'src/app/MessageResponse';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { Dictionary } from '../../parent/Dictionary';
import { ParentService } from '../../parent/service/parent.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ParentService {
  url = environment.baseUrl + ApiPaths.CATEGORIES;
  
  getCategories() {
      return this.get(this.url);
  }

  saveEditCategory(id: number, name: string, disabledPanel: () => void, fetchCategories: () => void) {
    return this.save(this.url, id, name, disabledPanel, fetchCategories);
  }

  deleteCategory(id: number, fetchCategories: () => void) {
    this.delete(this.url, id, fetchCategories);
  }
}
