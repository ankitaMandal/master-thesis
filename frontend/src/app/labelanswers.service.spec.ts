import { TestBed } from '@angular/core/testing';

import { LabelanswersService } from './labelanswers.service';

describe('LabelanswersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabelanswersService = TestBed.get(LabelanswersService);
    expect(service).toBeTruthy();
  });
});
