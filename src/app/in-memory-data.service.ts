import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const verbs = [
      { id: 1, language_id: 'en', in_language: 'to be', last_update: ''},
      { id: 2, language_id: 'en', in_language: 'to have', last_update: ''},
    ];
    const verbsforms = [
      { id: 1, verb_id: 1, form_type_id: 9, language_id: 'en', in_language: 'was', last_update: ''}];
    const formstypes = [
      { id: 1, language_id: 'es', number: 1, in_language: 'gérondif', last_update: ''},
      { id: 2, language_id: 'es', number: 2, in_language: 'participe passé', last_update: ''},
      { id: 3, language_id: 'es', number: 3, in_language: '1ere pers sing présent indicatif', last_update: ''},
      { id: 4, language_id: 'es', number: 4, in_language: '2eme pers sing présent indidatif', last_update: ''},
      { id: 5, language_id: 'es', number: 5, in_language: '3eme pers sing présent indidatif', last_update: ''},
      { id: 6, language_id: 'es', number: 6, in_language: '1ere pers plur présent indicatif', last_update: ''},
      { id: 7, language_id: 'es', number: 7, in_language: '2eme pers plur présent indicatif', last_update: ''},
      { id: 8, language_id: 'es', number: 8, in_language: '3eme pers plur présent indicatif', last_update: ''},
      { id: 9, language_id: 'en', number: 1, in_language: 'preterite', last_update: ''},
      { id: 10, language_id: 'en', number: 2, in_language: 'Past participle', last_update: ''},
    ];
    const words = [
      { id: 1, language_id: 'en', theme_id: 1, in_french: 'bonjour', sort_word: 'bonjour', in_language: 'hello', last_update: '',
        language_level: 1, pronunciation: ''},
      { id: 2, language_id: 'en', theme_id: 2, in_french: 'au revoir', sort_word: 'revoir', in_language: 'bye', last_update: '',
        language_level: 1, pronunciation: ''}];
    const languages = [
      { id: 1, language_id: 'en', name: 'Anglais', icon: 'anglais.png'},
      { id: 2, language_id: 'es', name: 'Espagnol', icon: 'espagnol.png' },
      { id: 3, language_id: 'it', name: 'Italien', icon: 'italien.png' },
      { id: 4, language_id: 'po', name: 'Portugais', icon: 'portugais.png' }];
    const themes = [
      { id: 1, language_id: 'en', number: 1, in_language: 'theme one', last_update: ''},
      { id: 2, language_id: 'en', number: 2, in_language: 'theme two', last_update: ''},
      { id: 3, language_id: 'en', number: 3, in_language: 'theme three', last_update: ''},
      { id: 4, language_id: 'es', number: 1, in_language: 'tema uno', last_update: ''},
      { id: 5, language_id: 'es', number: 2, in_language: 'tema dos', last_update: ''}];
    return {verbs, verbsforms, formstypes, words, languages, themes};
  }
}
