import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  maxPageSize = 10;
  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns: any;
  dictName = '';
  enabledBottomPanel = false;
  currentDictionary: Dictionary = new Dictionary();
  paginatorConfig = {
    pageSizeOptions: [this.maxPageSize, 25, 50],
    pageSize: this.maxPageSize,
    maxItems: 0,
    pageIndex: 0
  }

  constructor(private router: Router, 
    private service: DictionaryService) { }

  ngOnInit(): void {
    this.initVariables();
    this.displayedColumns = ['name', 'action'];
    this.getDictionaries();
  }

  initVariables() {
    if (this.router.url === '/category') {
      this.setInitialVariables(ApiPaths.CATEGORIES, 'Category');
    } else if (this.router.url === '/user-role') {
      this.setInitialVariables(ApiPaths.USER_ROLES, 'User role');
    } else if (this.router.url === '/person-role') {
      this.setInitialVariables(ApiPaths.PERSON_ROLES, 'Person role');
    }
  }

  setInitialVariables(selectedDictionaryPath: ApiPaths, title: string) {
    this.selectedDictionaryPath = selectedDictionaryPath;
    this.title = title;
  }

  getDictionaries() {
    this.dictionaries = this.service.getPaginatedDirectories(this.selectedDictionaryPath, this.paginatorConfig.pageSize, this.paginatorConfig.pageIndex).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.body!;
        this.paginatorConfig.maxItems = Number(res.headers.get('X-MAX-RESULTS'));
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

  public pageChangeEvent(event?: PageEvent) {
    if (event != null) {
      this.paginatorConfig.pageIndex = event.pageIndex;
      this.paginatorConfig.pageSize = event.pageSize;
    }
    this.getDictionaries();
  }
}
