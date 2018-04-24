import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalesService} from '../../globales.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ThemeService} from '../../models/themes/theme.service';
import {Theme} from '../../models/themes/theme';
import {NumberControlService} from '../../models/themes/number-control.service';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit {

  theme: Theme = new Theme;
  themes: Theme[];
  form: FormGroup;
  url: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService,
              private location: Location,
              public globales: GlobalesService,
              private numberControlService: NumberControlService) {

    this.globales.checkContext(true, true);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    const id = +this.route.snapshot.paramMap.get('id');
    const initiateur = this.url === 'new' ? Observable.of(new Theme()) : this.themeService.getTheme(id);
    const chercheNumber = this.url === 'new' ? this.themeService.getThemes(this.globales.currentLanguage.language_id) : Observable.of([]);
    initiateur
      .subscribe(theme => {
        this.theme = theme;
        chercheNumber.
          subscribe(themes => {
            if (themes.length > 0) {
              this.theme.number = Math.max(...themes.map(x => x.number)) + 1;
            }
            this.initForm();
        });
      });
  }

  onSubmit() {
    if (this.form.invalid || this.form.pending) { return; }
    for (const propriete of Object.getOwnPropertyNames(new Theme())) {
      this.theme[propriete] = this.form.get(propriete).value;
    }

    const requete = this.url === 'new' ? this.themeService.addTheme(this.theme) : this.themeService.updateTheme(this.theme);
    requete.subscribe(() => this.router.navigate(['/themes']));
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({value: this.theme.id, disabled: true}),
      language_id: new FormControl({value: this.globales.currentLanguage.language_id, disabled: true}),
      number: new FormControl(this.theme.number,
        [Validators.required,
          Validators.pattern('\\d+')],
          this.validateNumberIsUnic.bind(this)
          ),
      in_language: new FormControl(this.theme.in_language, Validators.required),
      last_update: new FormControl({value: this.theme.last_update, disabled: true})
    }, {updateOn: 'submit'});
  }

  validateNumberIsUnic(control: AbstractControl) {
    const controleur = this.url === 'new' || +control.value !== this.theme.number ?
      this.numberControlService.checkNumberUnic(+control.value) :
      Observable.of(true);
    return controleur.map(res => {
      return res ? null : { existeDeja: true };
    });
  }

  onCancel(): void {
    this.location.back();
  }
}

