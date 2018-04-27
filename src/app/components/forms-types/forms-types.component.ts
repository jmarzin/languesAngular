import { Component, OnInit } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {FormsTypes} from '../../models/forms-types/forms-types';
import {FormsTypesService} from '../../models/forms-types/forms-types.service';

@Component({
  selector: 'app-forms-types',
  templateUrl: './forms-types.component.html',
  styleUrls: ['./forms-types.component.css']
})
export class FormsTypesComponent implements OnInit {

  formsTypes: FormsTypes[];
  displayedColumns: string[];
  lectureEnCours = true;

  constructor(public globales: GlobalesService,
              private formsTypesService: FormsTypesService) {
    this.globales.checkContext(false, true);
  }

  ngOnInit() {
    this.formsTypesService.getFormsTypes(this.globales.currentLanguage.language_id).
      subscribe(formsTypes => {
        this.formsTypes = formsTypes;
        this.lectureEnCours = false;
      });
    this.displayedColumns = Object.getOwnPropertyNames(new FormsTypes());
  }
}
