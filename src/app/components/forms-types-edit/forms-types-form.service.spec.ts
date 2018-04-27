import { TestBed, inject } from '@angular/core/testing';

import { FormsTypesFormService } from './forms-types-form.service';

describe('FormsTypesFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormsTypesFormService]
    });
  });

  it('should be created', inject([FormsTypesFormService], (service: FormsTypesFormService) => {
    expect(service).toBeTruthy();
  }));
});
