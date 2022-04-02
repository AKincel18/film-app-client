import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
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
  maxPageSize = 10;
  paginatorConfig = {
    pageSizeOptions: [this.maxPageSize, 25, 50],
    pageSize: this.maxPageSize,
    maxItems: 0,
    pageIndex: 0
  }
  
  constructor(private personService: PersonService, 
              private dictService: DictionaryService,
              private formBuilder: FormBuilder) 
              { }

  ngOnInit(): void {
    this.displayedColumns = ['firstName', 'lastName', 'birthDate', 'personRole', 'action'];
    this.generatePersonForm();
    this.personRoles = this.dictService.getDictionaries(ApiPaths.PERSON_ROLES);
    this.getAllPersons();
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

  getAllPersons() {
    this.personService.getPaginatedPersons(this.paginatorConfig.pageSize, this.paginatorConfig.pageIndex).subscribe({
      next: (res) => {
        this.dataSource.data = res.body!;
        this.paginatorConfig.maxItems = Number(res.headers.get('X-MAX-RESULTS'));
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
    const fetchPersons = () => (this.getAllPersons());
    this.personService.addEditPerson(this.currentPersonId, this.personForm.value, disabledRightPanel, fetchPersons);
  }

  deleteButtonClicked(id: number) {
    const disabledRightPanel = () => (this.enabledRightPanel = false);
    const fetchPersons = () => (this.getAllPersons());
    this.personService.deletePerson(id, disabledRightPanel, fetchPersons);
  }

  public pageChangeEvent(event?: PageEvent) {
    if (event != null) {
      this.paginatorConfig.pageIndex = event.pageIndex;
      this.paginatorConfig.pageSize = event.pageSize;
    }
    this.getAllPersons();
  }

}
