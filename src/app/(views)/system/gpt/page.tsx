'use client';

import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import UITextarea from '@/components/ui/textarea/UITextarea';
import UIButton from '@/components/ui/button/UIButton';
import { openModal } from '@/store/tech/techSlice';
import routeChecker from '@/hoc/routeChecker';
import { ScrollArea } from '@/components/ui/scroll-area/ScrollArea';
import { EGPT_SETTINGS_TYPE } from '@/core/interfaces/enums';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';
import UIInput from '@/components/ui/input/UIInput';

interface IGptSettings {
  user_model: string;
  admin_model: string;
  spec: number;
  system_message: string;
  user_message: string;
  admin_amount: string | number;
  user_amount: string | number;
  temperature: number | string;
}

const SystemGptPage = () => {
  const [settingsType, setSettingsType] = useState<EGPT_SETTINGS_TYPE>(EGPT_SETTINGS_TYPE.TEST);
  const dispatch = useAppDispatch();
  const [gptSettings, setGptSettings] = useState<IGptSettings>();

  const availableGptModels = [
    'gpt-4.1',
    'gpt-4.1-mini',
    'gpt-4.1-nano',
    'gpt-4.5-preview',
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4o',
  ];

  const gptTypeButtons: Array<{ id: EGPT_SETTINGS_TYPE; text: string }> = [
    {
      id: EGPT_SETTINGS_TYPE.TEST,
      text: 'Настройки для тестов',
    },
    {
      id: EGPT_SETTINGS_TYPE.INTERVIEW,
      text: 'Настройки для интервью',
    },
    {
      id: EGPT_SETTINGS_TYPE.RESUME_CHECK,
      text: 'Настройки для проверки резюме',
    },
    {
      id: EGPT_SETTINGS_TYPE.RESUME_CREATE,
      text: 'Настройки для создания резюме',
    },
  ];

  const loadSettings = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<{ type: EGPT_SETTINGS_TYPE }, IGptSettings>('/system/gpt-settings', {
        type: settingsType,
      });
      setGptSettings(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, settingsType]);

  const handleChangeSettings = (value: Partial<IGptSettings>) => {
    // @ts-expect-error ne budet undefined
    setGptSettings((prev) => ({
      ...(prev || {}),
      ...value,
    }));
  };

  const saveGptSettings = async () => {
    if (!gptSettings) {
      return;
    }
    if (
      !availableGptModels.includes(gptSettings?.admin_model) ||
      !availableGptModels.includes(gptSettings?.user_model)
    ) {
      dispatch(
        openModal({
          text: 'Некорректно указана модель. ТОЛЬКО модели из списка ' + availableGptModels.join(', '),
          type: 'error',
        })
      );

      return;
    }

    if (+gptSettings.temperature < 0 || +gptSettings.temperature > 2) {
      dispatch(
        openModal({
          text: 'Некорректно указана температура. ТОЛЬКО от 0 до 2',
          type: 'error',
        })
      );

      return;
    }

    if (
      settingsType === 'TEST' &&
      (isNaN(+gptSettings.user_amount) ||
        isNaN(+gptSettings.admin_amount) ||
        +gptSettings.user_amount < 0 ||
        +gptSettings.admin_amount < 0)
    ) {
      dispatch(
        openModal({
          text: 'Невалидное значение количества вопросов или их количество. Количество вопросов должно быть больше 0',
          type: 'error',
        })
      );

      return;
    }

    try {
      dispatch(setLoading(true));

      const result = await Api.post('/system/update-gpt-settings', {
        settings: {
          ...gptSettings,
          admin_amount: +gptSettings.admin_amount,
          user_amount: +gptSettings.user_amount,
          temperature: +gptSettings.temperature,
        },
        type: settingsType,
      });

      if (result.payload) {
        await loadSettings();
        dispatch(openModal({ text: 'Настройки успешно сохранены!' }));
      }
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <div className={'w-full h-full flex flex-col overflow-hidden'}>
      <div className={'text-2xl mb-2 text-center'}>Настройки</div>
      <div
        className={
          'grid grid-flow-col auto-cols-auto-fit auto-cols-[minmax(150px,max-content)] justify-center w-full gap-y-2 gap-x-2 mt-4'
        }
      >
        {gptTypeButtons.map((button) => (
          <UIFilterButton
            text={button.text}
            key={button.id}
            selected={button.id === settingsType}
            onClick={() => setSettingsType(button.id)}
          />
        ))}
      </div>
      <ScrollArea>
        <div className={'flex flex-col px-2 items-center mb-4'}>
          {gptSettings ? (
            <div className={'mt-3 w-full'}>
              <div className={'flex lg:flex-row flex-col gap-4'}>
                <div className={'flex flex-col'}>
                  <div className={'lg:text-2xl text-lg text-center'}>Настройки используемой модели GPT:</div>
                  <div className={'lg:text-xl text-base mb-2 text-center'}>
                    {`(ТОЛЬКО ${availableGptModels.map((model) => `'${model}'`).join(' || ')})`}
                  </div>
                  <div className={'flex flex-col gap-3'}>
                    <UIInput
                      value={gptSettings.admin_model}
                      id={'admin_model'}
                      label={'Модель админа'}
                      onInput={(val) => handleChangeSettings({ admin_model: val })}
                    />
                    <UIInput
                      id={'user_model'}
                      value={gptSettings.user_model}
                      label={'Модель пользователя'}
                      onInput={(val) => handleChangeSettings({ user_model: val })}
                    />
                  </div>
                </div>
                {settingsType === 'TEST' && (
                  <div className={'flex flex-col'}>
                    <div className={'lg:text-2xl text-lg text-center'}>
                      Настройки количества генерируемых вопросов GPT:
                    </div>
                    <div className={'lg:text-xl text-base mb-2 text-center'}>(!!ТОЛЬКО ЧИСЛА)</div>
                    <div className={'flex flex-col gap-3'}>
                      <UIInput
                        id={'admin_amount_input'}
                        value={gptSettings.admin_amount}
                        label={'Количество вопросов для админа'}
                        onInput={(val) => handleChangeSettings({ admin_amount: val })}
                      />
                      <UIInput
                        id={'user_amount_input'}
                        value={gptSettings.user_amount}
                        label={'Количество вопросов для пользователя'}
                        onInput={(val) => handleChangeSettings({ user_amount: val })}
                      />
                    </div>
                  </div>
                )}
                <div className={'flex flex-col lg:w-[max-content] w-full'}>
                  <div className={'lg:text-2xl text-lg text-center'}>Настройки температуры GPT:</div>
                  <div className={'lg:text-xl text-base mb-2 text-center'}>
                    (ТОЛЬКО ЧИСЛА ОТ 0 до 2 с десятичными значениями, например 0.2)
                  </div>
                  <div className={'flex gap-3 lg:w-[max-content] w-full'}>
                    <UIInput
                      value={gptSettings.temperature}
                      label={'Температура'}
                      onInput={(val) => handleChangeSettings({ temperature: val })}
                    />
                  </div>
                </div>
              </div>
              <div className={'flex flex-col mb-10'}>
                <div className={'lg:text-2xl text-lg mb-2 text-center'}>Промпты</div>
                {settingsType === 'TEST' && (
                  <div>
                    Можно использовать переменные:
                    <div className={'flex flex-col'}>
                      <span>$PASSED_QUESTIONS - вопросы из базы, которые пройдены пользователем, 20 штук.</span>
                      <span>$QUESTIONS_AMOUNT - количество генерируемых вопросов</span>
                      <span>$SKILL_LEVEL - уровень senior/junior</span>
                      <span>$QUESTION_TECHS - внутренние технологии в направлении, через запятую HTML, React, CSS</span>
                    </div>
                  </div>
                )}
                <div className={'flex lg:flex-row flex-col w-full h-full gap-3'}>
                  <div className={'flex w-full h-full'}>
                    <UITextarea
                      className={'flex-1 h-full'}
                      rows={9}
                      value={gptSettings.system_message}
                      label={'Системное сообщение'}
                      onInput={(val) => handleChangeSettings({ system_message: val })}
                    />
                  </div>
                  {settingsType === 'TEST' && (
                    <div className={'flex w-full h-full'}>
                      <UITextarea
                        value={gptSettings.user_message}
                        rows={9}
                        label={'Пользовательское сообщение'}
                        onInput={(val) => handleChangeSettings({ user_message: val })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={'flex items-center w-full mt-2 mb-2'}>
                <UIButton
                  className={'mx-auto'}
                  text={'Сохранить'}
                  onClick={saveGptSettings}
                />
              </div>
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
};

export default routeChecker(SystemGptPage, 'adminOnly');
