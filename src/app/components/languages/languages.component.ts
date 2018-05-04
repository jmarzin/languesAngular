import { Component, OnInit } from '@angular/core';
import {Language} from '../../models/languages/language';
import {LanguageService} from '../../models/languages/language.service';
import {GlobalesService} from '../../globales.service';

@Component({
  selector: 'app-langues',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  displayedColumns: string[];

  constructor(public globales: GlobalesService, public languageService: LanguageService) {
    this.globales.checkContext(false, false);
  }

  ngOnInit() {
    this.displayedColumns = ['actions'].concat(Object.getOwnPropertyNames(new Language()));
  }

  delete(language: Language): void {
    if (confirm('Vous êtes sûr ?')) {
      this.globales.languages = this.globales.languages.filter(h => h !== language);
      // TODO vérifier s'il y a encore des objets pour cette langue
      this.languageService.deleteLanguage(language).subscribe();
    }
  }
}
