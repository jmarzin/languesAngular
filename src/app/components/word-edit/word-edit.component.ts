import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WordService} from '../../models/words/word.service';
import {Word} from '../../models/words/word';
import {ThemeService} from '../../models/themes/theme.service';
import {Theme} from '../../models/themes/theme';
import {FormGroup} from '@angular/forms';
import {WordFormService} from './word-form.service';
import {GlobalesService} from '../../globales.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.css']
})
export class WordEditComponent implements OnInit {

  word: Word;
  themes: Theme[];
  form: FormGroup;
  in_french: string;
  submitInactif = false;

  constructor(private route: ActivatedRoute,
              private wordService: WordService,
              private themeService: ThemeService,
              private wordFormService: WordFormService,
              private router: Router,
              private globales: GlobalesService,
              private location: Location) {
    this.globales.checkContext(true, true);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wordService.getWord(id).
      subscribe(word => {
        this.word = word;
        this.globales.lastThemeId = this.word.theme_id;
        this.themeService.getThemes(this.word.language_id).
          subscribe( themes => {
            this.themes = themes;
            this.form = this.wordFormService.getForm(this.word);
        });
      });
  }

  onSubmit() {
    if (this.form.invalid || this.form.pending) { return; }
    this.submitInactif = true;
    for (const propriete of Object.getOwnPropertyNames(new Word())) {
      this.word[propriete] = this.form.get(propriete).value;
    }
    this.globales.lastThemeId = this.word.theme_id;
    this.wordService.updateWord(this.word)
      .subscribe(() => this.router.navigate([`/themes/${this.word.theme_id}/words`]));
  }

  onCancel() {
    this.location.back();
  }

  onKey(event: any) {
    const tab = event.target.value.split(/[ ,'\/]/);
    this.form.patchValue({ sort_word: this.wordFormService.filtreMotsVides(tab) });
  }
}
