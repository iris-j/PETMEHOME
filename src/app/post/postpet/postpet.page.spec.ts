import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpetPage } from './postpet.page';

describe('PostpetPage', () => {
  let component: PostpetPage;
  let fixture: ComponentFixture<PostpetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostpetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
