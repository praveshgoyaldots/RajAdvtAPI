import { TestBed } from '@angular/core/testing';

import { JankalyanlogService } from './jankalyanlog.service';

describe('JankalyanlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JankalyanlogService = TestBed.get(JankalyanlogService);
    expect(service).toBeTruthy();
  });
});
