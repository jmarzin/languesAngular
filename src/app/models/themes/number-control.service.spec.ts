import { TestBed, inject } from '@angular/core/testing';

import { NumberControlService } from './number-control.service';

describe('NumberControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberControlService]
    });
  });

  it('should be created', inject([NumberControlService], (service: NumberControlService) => {
    expect(service).toBeTruthy();
  }));
});
