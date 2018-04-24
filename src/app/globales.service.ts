import { Injectable } from '@angular/core';
import {Language} from './models/langues/language';
import {LanguageService} from './models/langues/language.service';
import {Router} from '@angular/router';

@Injectable()
export class GlobalesService {
  currentLanguage: Language = null;
  administrateur = true;
  languages: Language[];
  lastThemeId: number;

  constructor(private langueService: LanguageService,
              private router: Router) {
    this.langueService.getLanguages()
      .subscribe(langues => this.languages = langues);
  }

  checkContext(adminRequired: boolean, languageRequired: boolean): void {
    if (adminRequired && !this.administrateur) {
      this.router.navigate(['/admin']);
    } else if (languageRequired && !this.currentLanguage) {
      this.router.navigate(['/']);
    }
  }
}
