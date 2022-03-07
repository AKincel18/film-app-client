import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MyErrorStateMatcher } from 'src/classes/MyErrorStateMatcher';
import { ApiPaths } from 'src/enums/ApiPaths';
import { DictionaryService } from '../../dictionary/service/dictionary.service';
import { Person } from '../Person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  dataSource = new MatTableDataSource<Person>();
  displayedColumns: any;
  enabledRightPanel = false;
  currentPersonId: number | null = -1;
  personRoles: any;
  addEditPersonTitle: any;
  personForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  
  constructor(private personService: PersonService, 
              private dictService: DictionaryService,
              private formBuilder: FormBuilder) 
              { }

  ngOnInit(): void {
    this.displayedColumns = ['firstName', 'lastName', 'birthDate', 'personRole', 'action'];
    this.generatePersonForm();
    this.personRoles = this.dictService.getDictionaries(ApiPaths.PERSON_ROLES);
    this.findAllPersons();
  }

  generatePersonForm() {
    this.personForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        roleId: new FormControl('', [Validators.required])
      }
    );
  }

  findAllPersons() {
    this.personService.getPersons().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  editButtonClicked(person: Person) {
    this.enabledRightPanel = true;
    this.currentPersonId = person.id;
    this.addEditPersonTitle = 'Edit person';
    this.setFields(person);
  }

  setFields(person: Person) {
    this.personForm.setValue({
      firstName: person.firstName,
      lastName: person.lastName,
      birthDate: person.birthDate,
      roleId: person.personRole.id
    });
  }

  addButtonClicked() {
    this.enabledRightPanel = true;
    this.currentPersonId = null;
    this.addEditPersonTitle = 'Add person';
    this.personForm.reset();
  }

  saveButtonClicked() {
    const disabledRightPanel = () => (this.enabledRightPanel = false);
    const fetchPersons = () => (this.findAllPersons());
    this.personService.addEditPerson(this.currentPersonId, this.personForm.value, disabledRightPanel, fetchPersons);
  }

  deleteButtonClicked(id: number) {
    const disabledRightPanel = () => (this.enabledRightPanel = false);
    const fetchPersons = () => (this.findAllPersons());
    this.personService.deletePerson(id, disabledRightPanel, fetchPersons);
  }

}
