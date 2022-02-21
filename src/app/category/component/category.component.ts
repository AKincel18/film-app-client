import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../Category';
import { CategoryService } from '../service/categoryservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories : any;

  dataSource = new MatTableDataSource<Category>();
  displayedColumns: any;
  categoryName = '';
  enabledBottomPanel = false;
  currentCategory: Category = new Category(0, '');

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'action'];
    this.getCategories();
  }

  getCategories() {
    this.categories = this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  editCategory(element: Category) {
    this.currentCategory = element;
    this.categoryName = this.currentCategory.name;
    this.enabledBottomPanel = true;
  }

  deleteCategory(id: number) {
    const fetchCategories = () => (this.getCategories());
    this.categoryService.deleteCategory(id, fetchCategories);
  }

  addButtonClicked() {
    this.enabledBottomPanel = true;
    this.categoryName = '';
    this.currentCategory = new Category(null!, '');
  }

  saveEditCategory() {
    const disabledPanel = () => (this.enabledBottomPanel = false);
    const fetchCategories = () => (this.getCategories());
    this.categoryService.saveEditCategory(this.currentCategory.id, this.categoryName, disabledPanel, fetchCategories);
  }

}
