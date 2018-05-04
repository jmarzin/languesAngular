import { Component, OnInit } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {VerbService} from '../../models/verbs/verb.service';
import {ActivatedRoute} from '@angular/router';
import {Verb} from '../../models/verbs/verb';
import {VerbsFormService} from '../../models/verbs-forms/verbs-form.service';
import {VerbsForm} from '../../models/verbs-forms/verbs-form';
import {FormsTypes} from '../../models/forms-types/forms-types';
import {FormsTypesService} from '../../models/forms-types/forms-types.service';
import {Location} from '@angular/common';

interface Ligne {form_type: string; in_language: string; }

@Component({
  selector: 'app-verb-detail',
  templateUrl: './verb-detail.component.html',
  styleUrls: ['./verb-detail.component.css']
})
export class VerbDetailComponent implements OnInit {

  url: string;
  verb: Verb;
  verbForms: VerbsForm[];
  formsTypes: FormsTypes[];
  lectureEnCours = true;
  displayedColumns = ['form_type', 'in_language'];
  lignes: Ligne[] = [];

  constructor(public globales: GlobalesService,
              private verbService: VerbService,
              private route: ActivatedRoute,
              private verbsFormService: VerbsFormService,
              private formsTypesService: FormsTypesService,
              private location: Location) {
    this.globales.checkContext(false, true);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    const id = +this.route.snapshot.paramMap.get('id');
    this.verbService.getVerb(id)
      .subscribe(verb => {
        this.verb = verb;
        this.verbsFormService.getVerbsFormsByVerb(id)
          .subscribe(verbForms => {
            this.verbForms = verbForms;
            this.formsTypesService.getFormsTypes(this.globales.currentLanguage.language_id)
              .subscribe(formsTypes => {
                this.formsTypes = formsTypes;
                this.lignes = verbForms.map(x =>
                  <Ligne>{ form_type: this.formsTypes.filter(f => f.id === x.form_type_id).pop().in_french,
                  in_language: x.in_language });
                this.lectureEnCours = false;
              });
        });
    });
  }

  cancel() {
    this.location.back();
  }
}
