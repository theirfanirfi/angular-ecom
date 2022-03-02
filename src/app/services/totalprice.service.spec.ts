import { TestBed } from '@angular/core/testing';

import { TotalpriceService } from './totalprice.service';

describe('TotalpriceService', () => {
  let service: TotalpriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalpriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
