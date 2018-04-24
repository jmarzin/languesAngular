export class Language {
  id = 0;
  language_id = '';
  name = '';
  icon = '';

  public iconUrl(): string {
    return `./assets/${this.icon}`;
  }
}
