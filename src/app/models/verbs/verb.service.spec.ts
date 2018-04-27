import { TestBed, inject } from '@angular/core/testing';

import { VerbService } from './verb.service';

describe('VerbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerbService]
    });
  });

  it('should be created', inject([VerbService], (service: VerbService) => {
    expect(service).toBeTruthy();
  }));
});
