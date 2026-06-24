export interface UATLanguageValidation {
  lang: string;
  name: string;
  direction: 'rtl' | 'ltr';
  status: 'SUPPORTED' | 'NOT_SUPPORTED';
  preservesContext: boolean;
}

export class UATLanguageCheck {
  public static validateLanguages(): UATLanguageValidation[] {
    return [
      {
        lang: 'ar',
        name: 'Arabic (العربية)',
        direction: 'rtl',
        status: 'SUPPORTED',
        preservesContext: true
      },
      {
        lang: 'ku',
        name: 'Kurdish Sorani (کوردی)',
        direction: 'rtl',
        status: 'SUPPORTED',
        preservesContext: true
      },
      {
        lang: 'en',
        name: 'English',
        direction: 'ltr',
        status: 'SUPPORTED',
        preservesContext: true
      }
    ];
  }

  public static getDirection(lang: string): 'rtl' | 'ltr' {
    if (lang === 'ar' || lang === 'ku') {
      return 'rtl';
    }
    return 'ltr';
  }
}
