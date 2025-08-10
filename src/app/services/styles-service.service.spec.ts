import { TestBed } from '@angular/core/testing';

import { StylesServiceService } from '../services/styles-service.service';

describe('StylesServiceService', () => {
  let service: StylesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
