import { TestBed } from '@angular/core/testing';

import { PersonRoleService } from './person-role.service';

describe('PersonRoleService', () => {
  let service: PersonRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
