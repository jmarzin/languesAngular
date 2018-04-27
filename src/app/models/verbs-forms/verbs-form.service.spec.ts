import { TestBed, inject } from '@angular/core/testing';

import { VerbsFormService } from './verbs-form.service';

describe('VerbsFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerbsFormService]
    });
  });

  it('should be created', inject([VerbsFormService], (service: VerbsFormService) => {
    expect(service).toBeTruthy();
  }));
});
