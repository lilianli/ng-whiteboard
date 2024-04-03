import { TestBed } from '@angular/core/testing';

import { NgWhiteboardComplexService } from './ng-whiteboard-complex.service';

describe('NgWhiteboardComplexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgWhiteboardComplexService = TestBed.get(NgWhiteboardComplexService);
    expect(service).toBeTruthy();
  });
});
