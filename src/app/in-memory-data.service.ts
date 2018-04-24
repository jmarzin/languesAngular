import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
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
    return {words, languages, themes};
  }
}
