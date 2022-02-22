import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonRoleComponent } from './personrole.component';


describe('PersonRoleComponent', () => {
  let component: PersonRoleComponent;
  let fixture: ComponentFixture<PersonRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
