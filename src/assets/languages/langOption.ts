
export class LangOption {

  private availLanguages = [
  { langCode: 'pt_br', langName: 'Portugues Brasil'},
  { langCode: 'en_us', langName: 'English'},
  { langCode: 'es_es', langName: 'Espanhol'} ]

  getLang() {
    return this.availLanguages;
  }
}
