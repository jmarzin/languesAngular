import { Component, OnInit } from '@angular/core';
import {Theme} from '../../models/themes/theme';
import {GlobalesService} from '../../globales.service';
import {ThemeService} from '../../models/themes/theme.service';
import {WordService} from '../../models/words/word.service';

@Component({
  selector: 'app-langues',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  themes: Theme[];

  displayedColumns: string[];

  constructor(public globales: GlobalesService,
              public themeService: ThemeService,
              public wordService: WordService) {
    this.globales.checkContext(false, true);
  }

  ngOnInit(): void {
    this.themeService.getThemes(this.globales.currentLanguage.language_id).
      subscribe(themes => this.themes = themes);
    this.displayedColumns = Object.getOwnPropertyNames(new Theme).concat('actions');
  }

  delete(theme: Theme): void {
    if (confirm('Vous êtes sûr ?')) {
      this.wordService.getWordsByTheme(theme.id).
        subscribe(themes => {
          if (themes.length > 0) {
            alert('Suppression impossible : il reste des mots.');
          } else {
            this.themeService.deleteTheme(theme).
            subscribe(() =>
              this.themes = this.themes.filter(x => x.id !== theme.id));
          }
      });
    }
  }
}
