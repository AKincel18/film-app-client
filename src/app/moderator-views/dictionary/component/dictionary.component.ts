import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiPaths } from 'src/enums/ApiPaths';
import { Dictionary } from '../Dictionary';
import { DictionaryService } from '../service/dictionary.service';

@Component({
  selector: 'app-category',
  templateUrl: '/dictionary.component.html',
  styleUrls: ['/dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  selectedDictionaryPath : any; 
  title : any;
  dictionaries : any;

  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns: any;
  dictName = '';
  enabledBottomPanel = false;
  currentDictionary: Dictionary = new Dictionary();

  constructor(private router: Router, 
    private service: DictionaryService) { }

  ngOnInit(): void {
    this.initVariables();
    this.displayedColumns = ['name', 'action'];
    this.getDictionaries();
  }

  initVariables() {
    if (this.router.url === '/category') {
      this.selectedDictionaryPath = ApiPaths.CATEGORIES;
      this.title = 'Category';
    } else if (this.router.url === '/user-role') {
      this.selectedDictionaryPath = ApiPaths.USER_ROLES;
      this.title = 'User role';
    } else if (this.router.url === '/person-role') {
      this.title = 'Person role';
      this.selectedDictionaryPath = ApiPaths.PERSON_ROLES;
    }
  }

  getDictionaries() {
    this.dictionaries = this.service.getDictionaries(this.selectedDictionaryPath).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  
  edit(element: Dictionary) {
    this.currentDictionary = element;
    this.dictName = this.currentDictionary.name;
    this.enabledBottomPanel = true;
  }

  delete(id: number) {
    const fetchDictionaries = () => (this.getDictionaries());
    this.service.delete(this.selectedDictionaryPath, id, fetchDictionaries);
  }

  addButtonClicked() {
    this.enabledBottomPanel = true;
    this.dictName = '';
    this.currentDictionary = new Dictionary();
  }

  saveEdit() {
    const disabledPanel = () => (this.enabledBottomPanel = false);
    const fetchCategories = () => (this.getDictionaries());
    this.service.save(this.selectedDictionaryPath, this.currentDictionary.id, this.dictName, disabledPanel, fetchCategories);
  }


}
