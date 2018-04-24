import { Component, OnInit } from '@angular/core';
import { Language } from '../../models/langues/language';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from '../../models/langues/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalesService } from '../../globales.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-langue-detail',
  templateUrl: './language-detail.component.html',
  styleUrls: ['./language-detail.component.css']
})
export class LanguageDetailComponent implements OnInit {

  language: Language = new Language();
  form: FormGroup;
  url: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private langueService: LanguageService,
              private location: Location,
              public globales: GlobalesService) {

    this.globales.checkContext(true, false);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    const id = +this.route.snapshot.paramMap.get('id');
    const initiateur = this.url === 'new' ? Observable.of(new Language()) : this.langueService.getLanguage(id);
    initiateur
      .subscribe(language => {
        this.language = language;
        this.initForm();
      });
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    this.language.language_id = this.form.get('language_id').value;
    this.language.name = this.form.get('name').value;
    this.language.icon = this.form.get('icon').value;
    const requete = this.url === 'new' ? this.langueService.addLanguage(this.language) : this.langueService.updateLanguage(this.language);
    requete.subscribe(() => {
                      this.langueService.getLanguages()
                        .subscribe(langues => {
                            this.globales.languages = langues;
                            this.router.navigate(['/languages']);
                          });
    });
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({value: this.language.id, disabled: true}),
      language_id: new FormControl(this.language.language_id,
        [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          (control: FormControl): {[key: string]: any} => {
            if (this.url !== 'new') { return null; }
            const code = control.value;
            const tab = this.globales.languages;
            return tab.filter( x => x.language_id === code).length > 0 ? {existeDeja: true} : null;
          }]),
      name: new FormControl(this.language.name, Validators.required),
      icon: new FormControl(this.language.icon, Validators.required)
    }, {updateOn: 'submit'});
  }

  onCancel(): void {
    this.location.back();
  }
}
