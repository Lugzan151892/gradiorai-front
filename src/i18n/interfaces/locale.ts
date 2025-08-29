export type TLocale = 'ru' | 'en';
export type TNameSpace = 'common' | 'main';

type Dedupe<T extends readonly unknown[], Seen extends readonly unknown[] = []> = T extends readonly [
  infer H,
  ...infer R,
]
  ? H extends Seen[number]
    ? Dedupe<R, Seen>
    : Dedupe<R, [...Seen, H]>
  : Seen;

type HasDuplicates<T extends readonly unknown[]> = T['length'] extends Dedupe<T>['length'] ? false : true;

function ensureNoDuplicates<const T extends readonly string[]>(
  arr: T & (HasDuplicates<T> extends true ? never : unknown)
) {
  return arr;
}

export const COMMON_KEYS = ensureNoDuplicates([
  'common_interview',
  'common_interview_description',
  'common_tests',
  'common_tests_description',
  'common_check_cv',
  'common_check_cv_description',
  'common_create_cv',
  'common_create_cv_description',
  'common_faq',
  'common_sitename',
  'common_terms_condition',
  'common_private_policy',
  'common_license',
  'common_instruments',
  'common_contacts',
] as const);
export const MAIN_KEYS = ensureNoDuplicates([
  'main_title',
  'main_subtitle',
  'main_description',
  'main_do_tests',
  'main_do_interview',
  'main_do_check_cv',
  'main_intruments_description',
  'main_card_title_1',
  'main_card_description_1',
  'main_card_additional_1',
  'main_card_title_2',
  'main_card_description_2',
  'main_card_additional_2',
  'main_card_title_3',
  'main_card_description_3',
  'main_card_additional_3',
  'main_card_title_4',
  'main_card_description_4',
  'main_card_additional_4',
  'interview_description',
  'main_interview_additional',
  'main_interview_card_title_1',
  'main_interview_card_description_1',
  'main_interview_card_title_2',
  'main_interview_card_description_2',
  'main_interview_card_title_3',
  'main_interview_card_description_3',
  'main_about',
  'main_about_additional',
  'main_about_card_title_1',
  'main_about_card_description_1',
  'main_about_card_title_2',
  'main_about_card_description_2',
  'main_about_card_title_3',
  'main_about_card_description_3',
  'main_about_card_title_4',
  'main_about_card_description_4',
  'main_about_card_title_5',
  'main_about_card_description_5',
  'main_about_card_title_6',
  'main_about_card_description_6',
  'main_tests_description',
  'main_tests_start',
  'main_tests_card_title_1',
  'main_level_junior',
  'main_level_middle',
  'main_level_senior',
  'main_tests_card_title_2',
  'main_tests_card_description_2',
  'main_tests_card_title_3',
  'main_tests_card_description_3',
  'main_tests_card_title_4',
  'main_tests_card_description_4',
  'main_cv_check',
  'main_cv_check_description',
  'main_cv_check_description_title',
  'main_cv_check_card_title_1',
  'main_cv_check_card_description_1',
  'main_cv_check_card_title_2',
  'main_cv_check_card_description_2',
  'main_cv_check_card_title_3',
  'main_cv_check_card_description_3',
  'main_cv_create',
  'main_cv_create_description',
  'main_do_create_cv',
  'main_faq_title',
  'main_faq_card_title_1',
  'main_faq_card_description_1',
  'main_faq_card_title_2',
  'main_faq_card_description_2',
  'main_faq_card_title_3',
  'main_faq_card_description_3',
  'main_faq_card_title_4',
  'main_faq_card_description_4',
  'main_faq_card_title_5',
  'main_faq_card_description_5',
] as const);
export type TCommonKey = (typeof COMMON_KEYS)[number];
export type TMainKey = (typeof MAIN_KEYS)[number];

export interface INamespaceKeyMap {
  main: TMainKey;
  common: TCommonKey;
}

export type TTranslationsShape = {
  [L in TLocale]: {
    [N in TNameSpace]: Record<INamespaceKeyMap[N], string>;
  };
};
