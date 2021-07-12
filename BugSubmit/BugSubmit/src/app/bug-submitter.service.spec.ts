import { TestBed } from '@angular/core/testing';

import { BugSubmitterService } from './bug-submitter.service';

describe('BugSubmitterService', () => {
  let service: BugSubmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugSubmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
