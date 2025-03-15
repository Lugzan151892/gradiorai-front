'use client';

import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { setLoading } from '@/features/loading/loadingSlice';
import { useAppDispatch } from '@/hooks/redux';
import React, { useCallback, useEffect, useState } from 'react';
import TechComponent from '@/app/(views)/(tests)/tests/components/TechComponent';
import { ETEST_SPEC } from '@/core/interfaces/enums';
import CustomInput from '@/components/ui/input/CustomInput';
import CustomTextarea from '@/components/ui/textarea/CustomTextarea';
import CustomButton from '@/components/ui/button/CustomButton';
import { openModal } from '@/store/tech/techSlice';

//'gpt-4o-mini' | 'gpt-4o'
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
  const dispatch = useAppDispatch();
  const [gptSettings, setGptSettings] = useState<IGptSettings>();
  const specs = [
    { id: ETEST_SPEC.QA, name: ETEST_SPEC[ETEST_SPEC.QA] },
    { id: ETEST_SPEC.FRONT, name: ETEST_SPEC[ETEST_SPEC.FRONT] },
    { id: ETEST_SPEC.BACK, name: ETEST_SPEC[ETEST_SPEC.BACK] },
  ];
  const [choosenSpec, setChoosenSpec] = useState<ETEST_SPEC>();

  const loadSettings = useCallback(async () => {
    if (!choosenSpec) {
      return;
    }
    try {
      dispatch(setLoading(true));
      const result = await Api.get<any, IGptSettings>('/system/gpt-settings', { spec: choosenSpec });
      setGptSettings(result.payload);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [choosenSpec, dispatch]);

  const handleSetSpec = (spec: ETEST_SPEC) => {
    setChoosenSpec(spec);
  };

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
    const models = ['gpt-4o-mini', 'gpt-4o'];
    if (!models.includes(gptSettings?.admin_model) || !models.includes(gptSettings?.user_model)) {
      dispatch(
        openModal({
          text: 'Некорректно указана модель. ТОЛЬКО gpt-4o-mini или gpt-4o',
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
      isNaN(+gptSettings.user_amount) ||
      isNaN(+gptSettings.admin_amount) ||
      +gptSettings.user_amount < 0 ||
      +gptSettings.admin_amount < 0
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
      });

      if (result.payload) {
        await loadSettings();
        dispatch(openModal({ text: 'Настройки успешно сохранены!' }));
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <div className={'w-full h-full'}>
      <div className={'w-full h-full flex flex-col px-2 items-center'}>
        <div className={'mt-3'}>
          <div className={'text-2xl mb-2 text-center'}>Укажите уровень вопроса:</div>
          <div
            className={
              'grid grid-flow-col auto-cols-auto-fit auto-cols-[minmax(150px,200px)] justify-center w-full gap-y-2 gap-x-2'
            }
          >
            {specs.map((el) => (
              <TechComponent
                className={'mt-2'}
                key={el.id}
                tech={el}
                selected={choosenSpec === el.id}
                onClick={() => handleSetSpec(el.id)}
              />
            ))}
          </div>
        </div>
        {choosenSpec && gptSettings ? (
          <div className={'mt-3'}>
            <div className={'text-2xl mb-2 text-center'}>Настройки</div>
            <div className={'flex gap-4'}>
              <div className={'flex flex-col'}>
                <div className={'text-2xl text-center'}>Настройки используемой модели GPT:</div>
                <div className={'text-xl mb-2 text-center'}>(ТОЛЬКО gpt-4o-mini (дешевая) или gpt-4o)</div>
                <div className={'flex flex-col gap-3'}>
                  <CustomInput
                    value={gptSettings.admin_model}
                    label={'Модель админа'}
                    onInput={(val) => handleChangeSettings({ admin_model: val })}
                  />
                  <CustomInput
                    value={gptSettings.user_model}
                    label={'Модель пользователя'}
                    onInput={(val) => handleChangeSettings({ user_model: val })}
                  />
                </div>
              </div>
              <div className={'flex flex-col'}>
                <div className={'text-2xl text-center'}>Настройки количества генерируемых вопросов GPT:</div>
                <div className={'text-xl mb-2 text-center'}>(!!ТОЛЬКО ЧИСЛА)</div>
                <div className={'flex flex-col gap-3'}>
                  <CustomInput
                    value={gptSettings.admin_amount}
                    label={'Количество вопросов для админа'}
                    onInput={(val) => handleChangeSettings({ admin_amount: val })}
                  />
                  <CustomInput
                    value={gptSettings.user_amount}
                    label={'Количество вопросов для пользователя'}
                    onInput={(val) => handleChangeSettings({ user_amount: val })}
                  />
                </div>
              </div>
              <div className={'flex flex-col w-[max-content]'}>
                <div className={'text-2xl text-center'}>Настройки температуры GPT:</div>
                <div className={'text-xl mb-2 text-center'}>
                  (ТОЛЬКО ЧИСЛА ОТ 0 до 2 с десятичными значениями, например 0.2)
                </div>
                <div className={'flex gap-3 w-[max-content]'}>
                  <CustomInput
                    value={gptSettings.temperature}
                    label={'Температура'}
                    onInput={(val) => handleChangeSettings({ temperature: val })}
                  />
                </div>
              </div>
            </div>
            <div className={'flex flex-col'}>
              <div className={'text-2xl mb-2 text-center'}>Промпты</div>
              <div>
                Можно использовать переменные:
                <div className={'flex flex-col'}>
                  <span>$PASSED_QUESTIONS - вопросы из базы, которые пройдены пользователем, 20 штук.</span>
                  <span>$QUESTIONS_AMOUNT - количество генерируемых вопросов</span>
                  <span>$SKILL_LEVEL - уровень senior/junior $SPECIALIZATION - направление front/back/qa</span>
                  <span>$QUESTION_TECHS - внутренние технологии в направлении, через запятую HTML, React, CSS</span>
                </div>
              </div>
              <div className={'flex w-full h-full gap-3'}>
                <div className={'flex flex-col w-full h-full'}>
                  <CustomTextarea
                    className={'flex-1 h-full'}
                    rows={9}
                    value={gptSettings.system_message}
                    label={'Системное сообщение'}
                    onInput={(val) => handleChangeSettings({ system_message: val })}
                  />
                </div>
                <div className={'flex flex-col w-full h-full'}>
                  <CustomTextarea
                    value={gptSettings.user_message}
                    rows={9}
                    label={'Пользовательское сообщение'}
                    onInput={(val) => handleChangeSettings({ user_message: val })}
                  />
                </div>
              </div>
            </div>
            <div className={'flex items-center w-full mt-2 mb-2'}>
              <CustomButton
                className={'mx-auto'}
                text={'Сохранить'}
                onClick={saveGptSettings}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SystemGptPage;
