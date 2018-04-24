import { TestBed, inject } from '@angular/core/testing';

import { FormsTypesService } from './forms-types.service';

describe('FormsTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormsTypesService]
    });
  });

  it('should be created', inject([FormsTypesService], (service: FormsTypesService) => {
    expect(service).toBeTruthy();
  }));
});
