import { Component, OnInit } from '@angular/core';
import {Word} from '../../models/words/word';
import {ActivatedRoute} from '@angular/router';
import {WordService} from '../../models/words/word.service';
import {ThemeService} from '../../models/themes/theme.service';
import {Theme} from '../../models/themes/theme';
import {GlobalesService} from '../../globales.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-words',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})

export class WordDetailComponent implements OnInit {

  word: Word;
  url: string;
  theme: Theme;

  constructor(private themeService: ThemeService,
              private wordService: WordService,
              private route: ActivatedRoute,
              public globales: GlobalesService,
              public location: Location) {

    this.globales.checkContext(false, true);
  }

  ngOnInit() {
    this.url = this.route.snapshot.url[1].toString();
    const id = +this.route.snapshot.paramMap.get('id');
    this.wordService.getWord(id).
      subscribe( word => {
        this.word = word;
        this.themeService.getTheme(word.theme_id).
          subscribe( theme => this.theme = theme);
    } );
  }

  delete(word: Word) {
    this.wordService.deleteWord(word).subscribe(() => this.location.back());
  }
}
