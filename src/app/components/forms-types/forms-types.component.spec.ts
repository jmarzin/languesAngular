import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTypesComponent } from './forms-types.component';

describe('FormsTypesComponent', () => {
  let component: FormsTypesComponent;
  let fixture: ComponentFixture<FormsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
