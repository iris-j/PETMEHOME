import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlostPage } from './postlost.page';

describe('PostlostPage', () => {
  let component: PostlostPage;
  let fixture: ComponentFixture<PostlostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostlostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
