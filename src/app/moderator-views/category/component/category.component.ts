import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dictionary } from '../../parent/Dictionary';
import { CategoryService } from '../service/categoryservice.service';

@Component({
  selector: 'app-category',
  templateUrl: '../../parent/template/parent.template.html',
  styleUrls: ['../../parent/template/parent.template.css']
})
export class CategoryComponent implements OnInit {
  title = 'Category';
  categories : any;

  dataSource = new MatTableDataSource<Dictionary>();
  displayedColumns: any;
  dictName = '';
  enabledBottomPanel = false;
  currentCategory: Dictionary = new Dictionary(0, '');

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'action'];
    this.getCategories();
  }

  getCategories() {
    this.categories = this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  edit(element: Dictionary) {
    this.currentCategory = element;
    this.dictName = this.currentCategory.name;
    this.enabledBottomPanel = true;
  }

  delete(id: number) {
    const fetchCategories = () => (this.getCategories());
    this.categoryService.deleteCategory(id, fetchCategories);
  }

  addButtonClicked() {
    this.enabledBottomPanel = true;
    this.dictName = '';
    this.currentCategory = new Dictionary(null!, '');
  }

  saveEdit() {
    const disabledPanel = () => (this.enabledBottomPanel = false);
    const fetchCategories = () => (this.getCategories());
    this.categoryService.saveEditCategory(this.currentCategory.id, this.dictName, disabledPanel, fetchCategories);
  }

}
