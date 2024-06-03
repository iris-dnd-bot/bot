import { languages } from '@iris/utils/constants.js';
import { LanguageInterface } from './LanguageInterface.js';

export abstract class Language {
    abstract id: languages;
    abstract data: LanguageInterface;
}
