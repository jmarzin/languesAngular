import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThemeService} from '../../models/themes/theme.service';
import {Theme} from '../../models/themes/theme';
import {WordService} from '../../models/words/word.service';
import {Word} from '../../models/words/word';
import {GlobalesService} from '../../globales.service';

@Component({
  selector: 'app-theme-words',
  templateUrl: './theme-words.component.html',
  styleUrls: ['./theme-words.component.css']
})
export class ThemeWordsComponent implements OnInit {

  url: string;
  theme: Theme;
  words: Word[] = [];
  displayedColumns: string[] = ['actions', 'id', 'in_french', 'sort_word', 'in_language'];

  constructor(private route: ActivatedRoute,
              private themeService: ThemeService,
              private wordService: WordService,
              public globales: GlobalesService) {
    this.globales.checkContext(false, true);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    const id = +this.route.snapshot.paramMap.get('id');
    this.themeService.getTheme(id).
      subscribe(theme => {
        this.theme = theme;
        this.wordService.getWordsByTheme(id).subscribe(words => this.words = words);
      });
  }

  delete(word: Word): void {
    if (confirm('Vous êtes sûr ?')) {
      this.words = this.words.filter(w => w.id !== word.id);
      this.wordService.deleteWord(word).subscribe();
    }
  }
}
