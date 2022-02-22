import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/enums/ApiPaths';
import { environment } from 'src/environments/environment';
import { ParentService } from '../../parent/service/parent.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends ParentService {
  url = environment.baseUrl + ApiPaths.USER_ROLES;

  getUserRoles() {
    return this.get(this.url);
  }

  saveEditUserRole(id: number, name: string, disabledPanel: () => void, fetchUserRoles: () => void) {
    return this.save(this.url, id, name, disabledPanel, fetchUserRoles);
  }

  deleteUserRole(id: number, fetchUserRoles: () => void) {
    this.delete(this.url, id, fetchUserRoles);
  }
}
