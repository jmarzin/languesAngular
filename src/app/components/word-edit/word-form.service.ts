import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Word} from '../../models/words/word';
import {Observable} from 'rxjs/Observable';
import {InFrenchControlService} from '../../models/words/in-french-control.service';

@Injectable()
export class WordFormService {

  motsVides = ['l', 'le', 'la', 'les', 'd', 'de', 'du', 'des', 'une', 'un', 'à', 'au', 'aux'];
  word: Word;

  constructor(private inFrenchControlService: InFrenchControlService) { }

  getForm(word: Word): FormGroup {
    this.word = word;
    const id = new FormControl({value: word.id, disabled: true});
    const language_id = new FormControl({value: word.language_id, disabled: true});
    const theme_id = new FormControl(+word.theme_id, Validators.required);
    const in_french = new FormControl(word.in_french, Validators.required, this.validateInFrenchIsUnic.bind(this));
    const sort_word = new FormControl(word.in_french, Validators.required);
    const in_language = new FormControl(word.sort_word, Validators.required);
    const pronunciation = new FormControl(word.pronunciation);
    const language_level = new FormControl(word.language_level,
      [Validators.required, Validators.pattern('\\d+'), Validators.min(1)]);
    const last_update = new FormControl({value: word.last_update, disabled: true});
    return new FormGroup({
      id, language_id, theme_id, in_french, sort_word,
      in_language, pronunciation, language_level, last_update
    }, { updateOn: 'blur' });
  }

  filtreMotsVides(tableau: string[]): string {
    if ( tableau.length === 1) { return tableau[0]; }
    let mot = tableau.shift();
    while (this.motsVides.includes(mot)) {
      if (tableau.length === 1) { return tableau[0]; }
      mot = tableau.shift();
    }
    return mot;
  }

  validateInFrenchIsUnic(control: AbstractControl) {
    let doublonEcran = false;
    if (control.parent && control.parent.parent) {
      const formArray = control.parent.parent;
      const listeMotsIdentiquesAuControle = formArray.value.filter(x => x.in_french === control.value);
      doublonEcran = (listeMotsIdentiquesAuControle.length > 0);
    }
    let controleur;
    if (control.value !== this.word.in_french && !doublonEcran) {
      controleur = this.inFrenchControlService.checkInFrenchUnic(control.value);
    } else {
      controleur = Observable.of(doublonEcran ? [null] : []);
    }
    return controleur.map(res => {
      if ( res.length === 0 ) {
        return null;
      } else if ( res[0] ) {
        return { existeDeja: res.map(x => x.theme_id).join('/') };
      } else {
        return { existeDejaListe: true};
      }
    });
  }
}
