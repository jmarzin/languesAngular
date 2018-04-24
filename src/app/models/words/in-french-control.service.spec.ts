import { TestBed, inject } from '@angular/core/testing';

import { InFrenchControlService } from './in-french-control.service';

describe('InFrenchControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InFrenchControlService]
    });
  });

  it('should be created', inject([InFrenchControlService], (service: InFrenchControlService) => {
    expect(service).toBeTruthy();
  }));
});
