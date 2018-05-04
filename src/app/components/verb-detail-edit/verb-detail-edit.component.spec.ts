import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbDetailEditComponent } from './verb-detail-edit.component';

describe('VerbDetailEditComponent', () => {
  let component: VerbDetailEditComponent;
  let fixture: ComponentFixture<VerbDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
