import { TestBed, inject } from '@angular/core/testing';

import { WordFormService } from './word-form.service';

describe('WordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordFormService]
    });
  });

  it('should be created', inject([WordFormService], (service: WordFormService) => {
    expect(service).toBeTruthy();
  }));
});
