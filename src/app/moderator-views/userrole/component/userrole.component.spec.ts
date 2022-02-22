import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleComponent } from './userrole.component';

describe('UserroleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
