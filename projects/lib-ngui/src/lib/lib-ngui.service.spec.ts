import { TestBed } from '@angular/core/testing';

import { LibNguiService } from './lib-ngui.service';

describe('LibNguiService', () => {
  let service: LibNguiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibNguiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
