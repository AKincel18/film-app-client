import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dictionary } from '../../parent/Dictionary';
import { UserRoleService } from '../service/user-role.service';

@Component({
  selector: 'app-userrole',
  templateUrl: '../../parent/template/parent.template.html',
  styleUrls: ['../../parent/template/parent.template.css']
})
export class UserRoleComponent implements OnInit {

  title = 'User role';
  userRoles : any;

  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns: any;
  dictName = '';
  enabledBottomPanel = false;
  currentUserRole: Dictionary = new Dictionary(0, '');

  constructor(
    private userRoleService: UserRoleService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'action'];
    this.getUserRoles();
  }

  getUserRoles() {
    this.userRoles = this.userRoleService.getUserRoles().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  edit(element: Dictionary) {
    this.currentUserRole = element;
    this.dictName = this.currentUserRole.name;
    this.enabledBottomPanel = true;
  }

  delete(id: number) {
    const fetchUserRoles = () => (this.getUserRoles());
    this.userRoleService.deleteUserRole(id, fetchUserRoles);
  }

  addButtonClicked() {
    this.enabledBottomPanel = true;
    this.dictName = '';
    this.currentUserRole = new Dictionary(null!, '');
  }

  saveEdit() {
    const disabledPanel = () => (this.enabledBottomPanel = false);
    const fetchUserRoles = () => (this.getUserRoles());
    this.userRoleService.saveEditUserRole(this.currentUserRole.id, this.dictName, disabledPanel, fetchUserRoles);
  }

}
