import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dictionary } from '../../parent/Dictionary';
import { PersonRoleService } from '../service/person-role.service';

@Component({
  selector: 'app-personrole',
  templateUrl: '../../parent/template/parent.template.html',
  styleUrls: ['../../parent/template/parent.template.css']
})
export class PersonRoleComponent implements OnInit {

  title = 'Person role';
  personRoles : any;

  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns: any;
  dictName = '';
  enabledBottomPanel = false;
  currentPersonRole: Dictionary = new Dictionary(0, '');

  constructor(
    private personRoleService: PersonRoleService) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'action'];
    this.getPersonRoles();
  }

  getPersonRoles() {
    this.personRoles = this.personRoleService.getPersonRoles().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  edit(element: Dictionary) {
    this.currentPersonRole = element;
    this.dictName = this.currentPersonRole.name;
    this.enabledBottomPanel = true;
  }

  delete(id: number) {
    const fetchPersonRoles = () => (this.getPersonRoles());
    this.personRoleService.deletePeronRole(id, fetchPersonRoles);
  }

  addButtonClicked() {
    this.enabledBottomPanel = true;
    this.dictName = '';
    this.currentPersonRole = new Dictionary(null!, '');
  }

  saveEdit() {
    const disabledPanel = () => (this.enabledBottomPanel = false);
    const fetchPersonRoles = () => (this.getPersonRoles());
    this.personRoleService.saveEditPersonRole(this.currentPersonRole.id, this.dictName, disabledPanel, fetchPersonRoles);
  }

}
