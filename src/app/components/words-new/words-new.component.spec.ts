import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsNewComponent } from './words-new.component';

describe('WordsNewComponent', () => {
  let component: WordsNewComponent;
  let fixture: ComponentFixture<WordsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
