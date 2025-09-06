export type TLocale = 'ru' | 'en';
export type TNameSpace = 'common' | 'main' | 'profile' | 'interview' | 'tests' | 'auth';

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
  'common_name',
  'common_change',
  'common_set_password',
  'common_password',
  'common_current_password',
  'common_repeat_password',
  'common_confirm_email',
  'common_new_password',
  'common_confirm_password',
  'common_file_added',
  'common_wrong_file_format',
  'common_wrong_file_size',
  'common_file_drag_available',
  'common_delete',
  'common_max_file_size',
  'common_available_formats',
  'common_password_changed',
  'common_field_empty',
  'common_passwords_doesnt_match',
  'common_password_validation',
  'common_profile',
  'common_results',
  'common_status',
  'common_date',
  'common_rating',
  'common_all',
  'common_cancel',
  'common_input_text',
  'common_invalid_format',
  'common_system',
  'common_logout',
  'common_trans_password',
  'common_email',
  'common_now',
  'common_daily_advice',
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
  'main_go_home',
  'main_users_rating_title',
  'main_users_rating_users_amount_title',
  'main_users_rating_max_rating_title',
] as const);

export const PROFILE_KEYS = ensureNoDuplicates([
  'profile_user_profile',
  'profile_change_avatar',
  'profile_add_avatar',
  'profile_cv_file',
  'profile_cv_file_description',
  'profile_username_changed',
  'profile_delete_interview',
  'profile_delete_interview_description',
  'profile_interview_success',
  'profile_interview_finished',
  'profile_interview_history',
  'profile_interview_failed',
  'profile_interview_in_progress',
  'profile_interview_result',
  'profile_time_all',
  'profile_time_today',
  'profile_time_week',
  'profile_time_month',
  'profile_time_three_months',
  'profile_result_eight_and_more',
  'profile_result_five_to_eight',
  'profile_result_four_and_less',
  'profile_result_any',
  'profile_google_user_notification',
] as const);

export const INTERVIEW_KEYS = ensureNoDuplicates([
  'interview_description',
  'interview_cv_file',
  'interview_add_file_vakancies',
  'interview_add_file_vakancies_description',
  'interview_your_vakancie',
  'interview_additional_info',
  'interview_additional_info_description',
  'interview_start',
  'interview_check_cv_description',
  'interview_check_cv_check',
  'interview_check_cv_clear',
  'interview_check_cv_result',
  'interview_create_cv_description',
  'interview_create_cv_about',
  'interview_create_cv_about_description',
  'interview_create_cv_prepare_resume',
  'interview_create_cv_result',
  'interview_result',
  'interview_start_new',
  'interview_voice_recording',
  'interview_answer_generation',
] as const);

export const TESTS_KEYS = ensureNoDuplicates([
  'tests_tests',
  'tests_description',
  'tests_questions_level',
  'tests_questions_level_description',
  'tests_spec',
  'tests_spec_description',
  'tests_spec_not_found',
  'tests_direction',
  'tests_direction_description',
  'tests_direction_not_found',
  'tests_generating_please_wait',
  'tests_start',
  'tests_next',
  'tests_finish',
  'tests_result',
  'test_try_again',
  'test_rate_testing',
  'test_leave_review',
  'test_leave_review_description',
  'test_leave_send_review',
  'test_result_bad',
  'test_result_good',
  'test_result_perfect',
] as const);

export const AUTH_KEYS = ensureNoDuplicates([
  'auth_login',
  'auth_welcome_back',
  'auth_forgot_password',
  'auth_registration',
  'auth_welcome',
  'auth_code_was_sent_to',
  'auth_code_resent',
  'auth_login_as_entrance',
  'auth_registration_as_reg',
  'auth_confirm_terms_text',
  'auth_change_password_title',
  'auth_change_password_change',
  'auth_password_changed_successfully',
  'auth_google_login',
  'auth_time_description',
] as const);
export type TCommonKey = (typeof COMMON_KEYS)[number];
export type TMainKey = (typeof MAIN_KEYS)[number];
export type TProfileKey = (typeof PROFILE_KEYS)[number];
export type TInterviewKey = (typeof INTERVIEW_KEYS)[number];
export type TTestsKey = (typeof TESTS_KEYS)[number];
export type TAuthKey = (typeof AUTH_KEYS)[number];

export interface INamespaceKeyMap {
  main: TMainKey;
  common: TCommonKey;
  profile: TProfileKey;
  interview: TInterviewKey;
  tests: TTestsKey;
  auth: TAuthKey;
}

export type TTranslationsShape = {
  [L in TLocale]: {
    [N in TNameSpace]: Record<INamespaceKeyMap[N], string>;
  };
};
