import {Component} from '@angular/core';
import {LanguageService} from './models/languages/language.service';
import {GlobalesService} from './globales.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Langues';

  constructor(private langueService: LanguageService,
              private globales: GlobalesService) {
    this.langueService.getLanguages()
      .subscribe(langues => {
        this.globales.languages = langues;
      });
  }
}
