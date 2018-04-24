import { TestBed, inject } from '@angular/core/testing';

import { GlobalesService } from './globales.service';

describe('GlobalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalesService]
    });
  });

  it('should be created', inject([GlobalesService], (service: GlobalesService) => {
    expect(service).toBeTruthy();
  }));
});
