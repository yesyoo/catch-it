import { TestBed } from '@angular/core/testing';

import { BookmarkRestService } from './bookmark-rest.service';

describe('BookmarkRestService', () => {
  let service: BookmarkRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
