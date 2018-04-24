import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MenuComponent} from './components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIcon} from '@angular/material';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        MatMenuModule,
        MatIcon
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Langues'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Langues');
  }));
  it('doit avoir un tag router-outlet', async( () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('router-outlet').length).toBe(1);
  }));
  it('should have themes menu item', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll(`a[routerLink='/themes']`).length).toBe(1);
  }));
});
