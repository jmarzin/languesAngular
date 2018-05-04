import { Component, OnInit } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {VerbService} from '../../models/verbs/verb.service';
import {Verb} from '../../models/verbs/verb';
import {VerbsFormService} from '../../models/verbs-forms/verbs-form.service';
import {VerbsForm} from '../../models/verbs-forms/verbs-form';
import {FormsTypesService} from '../../models/forms-types/forms-types.service';
import {FormsTypes} from '../../models/forms-types/forms-types';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-verb-detail-edit',
  templateUrl: './verb-detail-edit.component.html',
  styleUrls: ['./verb-detail-edit.component.css']
})
export class VerbDetailEditComponent implements OnInit {

  verb: Verb;
  verbForms: VerbsForm[];
  formsTypes: FormsTypes[];
  lectureEnCours = true;
  form: FormGroup;
  url: string;
  submitInactif = false;

  constructor(private globales: GlobalesService,
              private verbService: VerbService,
              private verbsFormService: VerbsFormService,
              private formsTypesService: FormsTypesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
    this.globales.checkContext(true, true);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    let requesteVerb: Observable<Verb>;
    let requestForms: Observable<VerbsForm[]>;
    if (this.url === 'new') {
      requesteVerb = Observable.of(new Verb());
      requestForms = Observable.of([]);
    } else {
      const id = +this.route.snapshot.paramMap.get('id');
      requesteVerb = this.verbService.getVerb(id);
      requestForms = this.verbsFormService.getVerbsFormsByVerb(id);
    }
    requesteVerb
      .subscribe(verb => {
        this.verb = verb;
        requestForms
          .subscribe(verbForms => {
            this.verbForms = verbForms;
            this.formsTypesService.getFormsTypes(this.globales.currentLanguage.language_id)
              .subscribe(formsTypes => {
                this.formsTypes = formsTypes.sort((leftSide, rightSide): number => {
                  if (leftSide.number < rightSide.number) { return -1; }
                  if (leftSide.number > rightSide.number) { return 1; }
                  return 0;
                });
                this.form = this.initForm();
                this.lectureEnCours = false;
              });
          });
      });
  }

  initForm(): FormGroup {
    const verb_in_language = new FormControl(this.verb.in_language,
      {validators: Validators.required, updateOn: 'blur'});
    const tableau_verb = new FormArray([]);
    this.formsTypes.forEach((formsType, index: number) => {
      const rang_type = new FormControl({value: index, disabled: true});
      const forme_verbale = this.verbForms.filter(x => x.form_type_id === formsType.id).pop();
      const id_form = new FormControl({value: forme_verbale ? forme_verbale.id : 0, disabled: true});
      const in_language_form = new FormControl(forme_verbale ? forme_verbale.in_language : '');
      tableau_verb.push(new FormGroup({rang_type, id_form, in_language_form}));
    });
    return new FormGroup({verb_in_language, tableau_verb});
  }

  onSubmit() {
    if (this.form.invalid || this.form.pending) { return; }
    this.submitInactif = true;
    const valeurs = this.form.getRawValue();
    this.verb.language_id = this.globales.currentLanguage.language_id;
    let requeteVerbe: Observable<Verb> = null;
    if (this.verb.id === 0) {
      this.verb.language_id = this.globales.currentLanguage.language_id;
      this.verb.in_language = valeurs.verb_in_language;
      requeteVerbe = this.verbService.addVerb(this.verb);
    } else if (valeurs.verb_in_language !== this.verb.in_language) {
      this.verb.in_language = valeurs.verb_in_language;
      requeteVerbe = this.verbService.updateVerb(this.verb);
    } else {
      requeteVerbe = Observable.of(this.verb);
    }
    requeteVerbe.subscribe(x => {
      if (x.id) {this.verb.id = x.id; }
      const requetesFormes: Observable<VerbsForm>[] = [];
      for (const ligne of valeurs.tableau_verb) {
        if (ligne.in_language_form === '') {
          if (ligne.id_form !== 0) {
            requetesFormes.push(this.verbsFormService.deleteVerbsForm(ligne.id_form));
          }
        } else if (ligne.id_form !== 0) {
          const verb_form = this.verbForms.filter(y => y.id === ligne.id_form).pop();
          if (ligne.in_language_form !== verb_form.in_language) {
            verb_form.in_language = ligne.in_language_form;
            requetesFormes.push(this.verbsFormService.updateVerbsForm(verb_form));
          }
        } else {
          const verb_form = new VerbsForm();
          verb_form.in_language = ligne.in_language_form;
          verb_form.form_type_id = this.formsTypes[ligne.rang_type].id;
          verb_form.language_id = this.globales.currentLanguage.language_id;
          verb_form.verb_id = this.verb.id;
          requetesFormes.push(this.verbsFormService.addVerbsForm(verb_form));
        }
      }
      const traitement = requetesFormes.length === 0 ? Observable.of([]) : forkJoin(requetesFormes);
      traitement.subscribe(() => this.router.navigate([`verbs/${this.verb.id}`]));
    });
  }

  onCancel() {
    this.location.back();
  }
}
