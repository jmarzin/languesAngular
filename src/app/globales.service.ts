import { Injectable } from '@angular/core';
import {Language} from './models/languages/language';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable()
export class GlobalesService {
  currentLanguage: Language = null;
  administrateur = true;
  languages: Language[]; // tableau des langues initialisé dans app.component
  lastThemeId: number;
  prefixeHttp: string;

  constructor(private router: Router) {
    this.prefixeHttp = environment.port_for_api;
  }

  checkContext(adminRequired: boolean, languageRequired: boolean): void {
    if (adminRequired && !this.administrateur) {
      this.router.navigate(['/admin']);
    } else if (languageRequired && !this.currentLanguage) {
      this.router.navigate(['/']);
    }
  }
}
