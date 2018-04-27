import { Component, OnInit } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {Verb} from '../../models/verbs/verb';
import {VerbService} from '../../models/verbs/verb.service';
import {VerbsFormService} from '../../models/verbs-forms/verbs-form.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.css']
})
export class VerbsComponent implements OnInit {

  verbs: Verb[];
  displayedColumns: string[];

  constructor(public globales: GlobalesService,
              private verbService: VerbService,
              private verbsFormService: VerbsFormService) {
    this.globales.checkContext(false, true);
  }

  ngOnInit() {
    this.verbService.getVerbs(this.globales.currentLanguage.language_id).
      subscribe(verbs => this.verbs = verbs);
    this.displayedColumns = ['actions'].concat(Object.getOwnPropertyNames(new Verb));
  }

  delete(verb: Verb): void {
    if (confirm('Vous êtes sûr ?')) {
      this.verbsFormService.getVerbsFormsByVerb(verb.id).
        subscribe(verbs => {
          if (verbs.length > 0) {
          if (!confirm('Il reste des formes verbales ! Vous êtes sûr ?')) {
            return;
          }
        }
        this.verbService.deleteVerb(verb).
        subscribe(() =>
          this.verbs = this.verbs.filter(x => x.id !== verb.id));
      });
    }
  }
}
