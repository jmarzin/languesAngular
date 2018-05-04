import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormsTypes} from '../../models/forms-types/forms-types';

@Injectable()
export class FormsTypesFormService {

  formsType: FormsTypes;

  constructor() { }

  getForm(formsType: FormsTypes, hasVerbs: boolean): FormGroup {
    this.formsType = formsType;
    const id = new FormControl({value: formsType.id, disabled: true});
    const language_id = new FormControl({value: formsType.language_id, disabled: true});
    const number = new FormControl({value: formsType.number, disabled: true});
    const in_french = new FormControl(formsType.in_french, [Validators.required, this.validateInLanguageIsUnic.bind(this)]);
    const last_update = new FormControl({value: formsType.last_update, disabled: true});
    const verbsIndicator = new FormControl({value: hasVerbs, disabled: true});
    return new FormGroup({
      id, language_id, number, in_french, last_update, verbsIndicator
    }, { updateOn: 'blur' });
  }

  validateInLanguageIsUnic(control: AbstractControl) {
    let doublonEcran = false;
    if (!control.pristine && control.value !== '' && control.parent && control.parent.parent) {
      const formArray = control.parent.parent;
      const listeMotsIdentiquesAuControle = formArray.value.filter(x => x.in_french === control.value);
      doublonEcran = (listeMotsIdentiquesAuControle.length > 0);
    }
    return doublonEcran ? { existeDejaListe: true} : null;
  }
}
