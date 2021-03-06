import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../../globales.service';
import { FormsTypes } from '../../models/forms-types/forms-types';
import { FormsTypesService } from '../../models/forms-types/forms-types.service';
import {FormArray, FormGroup} from '@angular/forms';
import {VerbsFormService} from '../../models/verbs-forms/verbs-form.service';
import {Location} from '@angular/common';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {FormsTypesFormService} from './forms-types-form.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Router} from '@angular/router';


@Component({
  selector: 'app-forms-types-edit',
  templateUrl: './forms-types-edit.component.html',
  styleUrls: ['./forms-types-edit.component.css']
})

export class FormsTypesEditComponent implements OnInit {

  formsTypes: FormsTypes[];
  form: FormGroup;
  formsTypeVide: FormsTypes;
  hasVerbs: boolean[] = [];
  submitInactif = false;

  constructor(public globales: GlobalesService,
              private formsTypesService: FormsTypesService,
              private verbsFormsService: VerbsFormService,
              private location: Location,
              private formsTypesFormService: FormsTypesFormService,
              private router: Router) {
    this.globales.checkContext(true, true);
  }

  ngOnInit() {
    this.formsTypesService.getFormsTypes(this.globales.currentLanguage.language_id).
      subscribe(formsTypes => {
      this.formsTypes = formsTypes;
      const requetes = this.formsTypes.map(x => this.verbsFormsService.getVerbsFormsByFormType(x.id));
      combineLatest(...requetes).subscribe(x => {
        x.forEach(y => this.hasVerbs.push(+y[0].count > 0));
        // initialisation d'un type vide
        this.formsTypeVide = new FormsTypes();
        this.formsTypeVide.language_id = this.globales.currentLanguage.language_id;
        // initialisation du tableau des types existants
        const typesForm = new FormArray([]);
        for (let i = 0 ; i < this.formsTypes.length ; i++) {
          typesForm.push(this.formsTypesFormService.getForm(this.formsTypes[i], this.hasVerbs[i]));
        }
        this.form = new FormGroup({
          typesForm: typesForm }, {updateOn: 'submit'});
      });
    });
  }

  add(i: number): void {
    const control = <FormArray>this.form.controls['typesForm'];
    control.insert(i, this.formsTypesFormService.getForm(this.formsTypeVide, false));
    this.hasVerbs.splice(i, 0, false);
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pending) { return; }
    this.submitInactif = true;
    const typesForm = this.form.getRawValue().typesForm;
    // suppression des formsTypes non retrouvées
    const listeToDelete = this.formsTypes.filter(x => typesForm.filter(y => y.id === x.id).length === 0)
      .map(x => this.formsTypesService.deleteFormsType(x));
    const typesFormsHttp = typesForm.map( x => {
      const localFormType = new FormsTypes();
      localFormType.id = x.id;
      localFormType.language_id = x.language_id;
      localFormType.number = x.number;
      localFormType.in_french = x.in_french;
      return localFormType.id === 0 ?
        this.formsTypesService.addFormsType(localFormType) :
        this.formsTypesService.updateFormsType(localFormType);
    });
    const tableauRequetes = typesFormsHttp.concat(listeToDelete);
    const chaine = forkJoin(tableauRequetes);
    chaine.subscribe(() => this.router.navigate(['/formstypes']));
  }

  remove(i: number): void {
    const control = <FormArray>this.form.controls['typesForm'];
    control.removeAt(i);
    this.hasVerbs.splice(i, 1);
  }

  onCancel() {
    this.location.back();
  }

  renum() {
    const controlArray = <FormArray>this.form.controls['typesForm'];
    let num = 1;
    for (let i = 0 ; i < controlArray.length ; i++) {
      const control = <FormGroup>controlArray.at(i);
      control.patchValue({number: num++});
    }
  }
}
