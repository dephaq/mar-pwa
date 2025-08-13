import en from './strings.en.json';
import ru from './strings.ru.json';

const langKey =
  (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) ||
  navigator.language;
const lang = langKey && langKey.toLowerCase().startsWith('ru') ? 'ru' : 'en';
const dict = lang === 'ru' ? ru : en;

type Dict = Record<string, unknown>;
const typedDict: Dict = dict as Dict;

export function t(key: string): string {
  const result = key
    .split('.')
    .reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Dict)[k] : undefined), typedDict);
  return typeof result === 'string' ? result : key;
}
