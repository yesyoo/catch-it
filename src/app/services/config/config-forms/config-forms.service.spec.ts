import { TestBed } from '@angular/core/testing';

import { ConfigFormsService } from './config-forms.service';

describe('ConfigFormsService', () => {
  let service: ConfigFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
