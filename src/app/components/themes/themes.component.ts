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
    this.displayedColumns = ['actions'].concat(Object.getOwnPropertyNames(new Theme));
  }

  delete(theme: Theme): void {
    if (confirm('Vous êtes sûr ?')) {
      this.wordService.getCountWordsByTheme(theme.id).
        subscribe(rep => {
          const count = +rep[0].count;
          if (count > 0) {
            if (!confirm(`Il reste ${count} mot${count > 1 ? 's' : ''} ! Vous êtes sûr ?`)) {
              return;
            }
          }
          this.themeService.deleteTheme(theme).
            subscribe(() =>
              this.themes = this.themes.filter(x => x.id !== theme.id));
      });
    }
  }
}
