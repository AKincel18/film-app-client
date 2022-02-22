import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { ParentService } from '../../parent/service/parent.service';

@Injectable({
  providedIn: 'root'
})
export class PersonRoleService extends ParentService {
  url = environment.baseUrl + ApiPaths.PERSON_ROLES;
  
  getPersonRoles() {
      return this.get(this.url);
  }

  saveEditPersonRole(id: number, name: string, disabledPanel: () => void, fetchPersonRoles: () => void) {
    return this.save(this.url, id, name, disabledPanel, fetchPersonRoles);
  }

  deletePeronRole(id: number, fetchPersonRoles: () => void) {
    this.delete(this.url, id, fetchPersonRoles);
  }
}
