import { TestBed } from '@angular/core/testing';

import { VarianceService } from './variance.service';

describe('VarianceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VarianceService = TestBed.get(VarianceService);
    expect(service).toBeTruthy();
  });
});
