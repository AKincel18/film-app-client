import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DictionaryService } from 'src/app/moderator-views/dictionary/service/dictionary.service';
import { PersonService } from 'src/app/moderator-views/person/service/person.service';
import { MyErrorStateMatcher } from 'src/classes/MyErrorStateMatcher';
import { ApiPaths } from 'src/enums/ApiPaths';
import { Film } from '../../Film';
import { FilmService } from '../../service/film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  dataSource = new MatTableDataSource<Film>();
  displayedColumns: any;
  enabledRightPanel = false;
  filmForm!: FormGroup;
  addEditFilmTitle = '';
  matcher = new MyErrorStateMatcher();
  categories: any;
  directors: any;
  currentFilmId: any;  
  maxPageSize = 10;
  paginatorConfig = {
    pageSizeOptions: [this.maxPageSize, 25, 50],
    pageSize: this.maxPageSize,
    maxItems: 0,
    pageIndex: 0
  }
  
  constructor(private formBuilder: FormBuilder,
              private filmService: FilmService,
              private dictionaryService: DictionaryService,
              private personService: PersonService) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'category', 'director', 'releaseDate', 'runningTime', 'budget' ,'action'];
    this.categories = this.dictionaryService.getDictionaries(ApiPaths.CATEGORIES);
    this.directors = this.personService.getDirectors();
    this.generateFilmForm();
    this.getAllFilms();    
  }

  getAllFilms() {
    this.filmService.getPaginatedFilms(this.paginatorConfig.pageSize, this.paginatorConfig.pageIndex).subscribe({
      next: (res) => {
        this.dataSource.data = res.body!;
        this.paginatorConfig.maxItems = Number(res.headers.get('X-MAX-RESULTS'));
      }, 
      error: (e) => {
        console.error(e);
      }
    })
  }
  
  generateFilmForm() {
    this.filmForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required]),
        directorId: new FormControl('', [Validators.required]),
        releaseDate: new FormControl(''),
        runningTime: new FormControl(''),
        budget: new FormControl('')
      }
    );
  }

  editButtonClicked(film: Film) {
    this.enabledRightPanel = true;
    this.currentFilmId = film.id;
    this.addEditFilmTitle = 'Edit film';
    this.setFields(film);
  }

  setFields(film: Film) {
    this.filmForm.setValue({
      name: film.name,
      categoryId: film.category.id,
      directorId: film.director.id,
      releaseDate: film.releaseDate,
      runningTime: film.runningTime,
      budget: film.budget
    });
  }

  addButtonClicked() {
    this.enabledRightPanel = true;
    this.currentFilmId = null;
    this.addEditFilmTitle = 'Add film';
    this.filmForm.reset();
  }

  saveButtonClicked() {
    const disabledRightPanel = () => (this.enabledRightPanel = false);
    const fetchFilms = () => (this.getAllFilms());
    this.filmService.addEditFilm(this.currentFilmId, this.filmForm.value, disabledRightPanel, fetchFilms);
  }

  deleteButtonClicked(id: number) {
    const disabledRightPanel = () => (this.enabledRightPanel = false);
    const fetchFilms = () => (this.getAllFilms());
    this.filmService.deleteFilm(id, disabledRightPanel, fetchFilms);
  }

  public pageChangeEvent(event?: PageEvent) {
    if (event != null) {
      this.paginatorConfig.pageIndex = event.pageIndex;
      this.paginatorConfig.pageSize = event.pageSize;
    }
    this.getAllFilms();
  }

}
