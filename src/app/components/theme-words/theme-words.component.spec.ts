import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeWordsComponent } from './theme-words.component';

describe('ThemeWordsComponent', () => {
  let component: ThemeWordsComponent;
  let fixture: ComponentFixture<ThemeWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
