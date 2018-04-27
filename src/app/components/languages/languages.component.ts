import { Component, OnInit } from '@angular/core';
import {Language} from '../../models/langues/language';
import {LanguageService} from '../../models/langues/language.service';
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
      this.languageService.deleteLanguage(language).subscribe();
    }
  }
}
