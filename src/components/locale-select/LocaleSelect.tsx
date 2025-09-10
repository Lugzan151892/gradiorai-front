import { TLocale } from "@/i18n/interfaces/locale";
import UISelect from "@/components/ui/select/UISelect";
import CustomIcon from "@/components/ui/icon/CustomIcon";
import React from "react";
import { useI18n } from "@/i18n/I18nProvider";


const LocaleSelect = () => {
  const { locale, setLocale } = useI18n();

  return (
    <UISelect
      options={[
        {
          id: 'ru',
          item: (
            <div className={'flex gap-2 items-center'}>
              <CustomIcon
                name={'flag-ru'}
                size={24}
              />
              <div className={'text-[10px] text-gray-200'}>RU</div>
            </div>
          ),
        },
        {
          id: 'en',
          item: (
            <div className={'flex gap-2 items-center'}>
              <CustomIcon
                name={'flag-us'}
                size={24}
              />
              <div className={'text-[10px] text-gray-200'}>EN</div>
            </div>
          ),
        },
      ]}
      value={locale}
      onChange={(val) => setLocale(String(val) as TLocale)}
      className={''}
      placeholder={'locale'}
    />
  );
};

export default LocaleSelect;