import { TestBed } from '@angular/core/testing';

import { PostinfoService } from './postinfo.service';

describe('PostinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostinfoService = TestBed.get(PostinfoService);
    expect(service).toBeTruthy();
  });
});
