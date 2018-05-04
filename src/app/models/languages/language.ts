export class Language {
  id = 0;
  language_id = '';
  name = '';
  icon = '';
  last_update = '';

  public iconUrl(): string {
    return `./assets/${this.icon}`;
  }
}
