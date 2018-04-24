import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordService} from './word.service';
import {GlobalesService} from '../../globales.service';
import {Word} from './word';

@Injectable()
export class InFrenchControlService {

  constructor(private wordService: WordService, private globales: GlobalesService) { }

  checkInFrenchUnic(in_french: string): Observable<Word[]> {
    return this.wordService.getWorsdByInFrench(in_french)
      .map(words => words.filter(x => x.language_id === this.globales.currentLanguage.language_id && x.in_french === in_french));
  }
}
