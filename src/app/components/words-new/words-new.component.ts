import { Component, OnInit } from '@angular/core';
import {GlobalesService} from '../../globales.service';
import {Theme} from '../../models/themes/theme';
import {Word} from '../../models/words/word';
import {FormArray, FormGroup} from '@angular/forms';
import {ThemeService} from '../../models/themes/theme.service';
import {WordFormService} from '../word-edit/word-form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {WordService} from '../../models/words/word.service';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-words-new',
  templateUrl: './words-new.component.html',
  styleUrls: ['./words-new.component.css']
})
export class WordsNewComponent implements OnInit {

  theme_id: number;
  theme: Theme;
  themes: Theme[];
  words: Word[];
  form: FormGroup;
  motsForm: FormArray;
  word: Word;

  constructor(private globales: GlobalesService,
              private themeService: ThemeService,
              private wordFormService: WordFormService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private wordService: WordService) {
    this.globales.checkContext(true, true);
  }

  ngOnInit() {
    this.theme_id = +this.route.snapshot.paramMap.get('id');
    this.globales.lastThemeId = this.theme_id;
    this.themeService.getThemes(this.globales.currentLanguage.language_id).
      subscribe( themes => {
        this.themes = themes;
        this.theme = themes.filter(x => x.id === this.theme_id).pop();
        this.word = new Word();
        this.word.theme_id = this.theme_id;
        this.word.language_id = this.globales.currentLanguage.language_id;
        this.motsForm = new FormArray([this.wordFormService.getForm(this.word)]);
        this.form = new FormGroup({
          motsForm: this.motsForm,
        }, {updateOn: 'submit'});
      });
  }

  add(): void {
    const control = <FormArray>this.form.controls['motsForm'];
    control.push(this.wordFormService.getForm(this.word));
  }

  remove(i: number) {
    const control = <FormArray>this.form.controls['motsForm'];
    control.removeAt(i);
  }

  onKey(event: any, i: number) {
    const tab = event.target.value.split(/[ ,'\/]/);
    const control = <FormArray>this.form.controls['motsForm'];
    control.at(i).patchValue({ sort_word: this.wordFormService.filtreMotsVides(tab) });
  }

  onSubmit() {
    if (this.form.invalid || this.form.pending) { return; }
    const valeursForm = this.form.value.motsForm;
    const motsCreations = valeursForm.map( x => {
      this.word.in_french = x.in_french;
      this.word.language_level = x.language_level;
      this.word.pronunciation = x.pronunciation;
      this.word.sort_word = x.sort_word;
      this.word.in_language = x.in_language;
      return this.wordService.addWord(this.word);
    });
    const chaine = forkJoin(motsCreations);
    chaine.subscribe(() => this.router.navigate([`themes/${this.theme.id}/words`]));
  }

  onCancel() {
    this.location.back();
  }
}
