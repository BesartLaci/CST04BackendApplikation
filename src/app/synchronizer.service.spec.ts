import { TestBed, inject } from '@angular/core/testing';

import { SynchronizerService } from './synchronizer.service';

describe('SynchronizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynchronizerService]
    });
  });

  it('should be created', inject([SynchronizerService], (service: SynchronizerService) => {
    expect(service).toBeTruthy();
  }));
});
