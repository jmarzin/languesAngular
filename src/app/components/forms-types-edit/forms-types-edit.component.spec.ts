import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTypesEditComponent } from './forms-types-edit.component';

describe('FormsTypesEditComponent', () => {
  let component: FormsTypesEditComponent;
  let fixture: ComponentFixture<FormsTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsTypesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
