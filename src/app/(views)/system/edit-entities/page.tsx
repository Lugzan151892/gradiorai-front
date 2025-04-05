'use client';

import CustomButton from '@/components/ui/button/CustomButton';
import React, { useCallback, useEffect, useState } from 'react';
import { entitiesListButtons } from '@/app/(views)/system/edit-entities/utils';
import { EEDITED_ENTITIE } from '@/app/(views)/system/edit-entities/interfaces';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { ISpecialization, ITechnology } from '@/core/interfaces/types';

const EditEntitiesView = () => {
  const [choosenEntitie, setChoosenEntitie] = useState<EEDITED_ENTITIE>();
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const dispatch = useAppDispatch();

  const loadSpecs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<null, ISpecialization[]>('/questions/get-specs');
      setSpecs(result.payload);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loadTechs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<null, { techs: ITechnology[]; questions_amount: number }>('/questions/get-techs');
      setTechs(result.payload.techs);
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loadEntitie = useCallback(() => {
    if (!choosenEntitie) {
      return;
    }

    switch (choosenEntitie) {
      case EEDITED_ENTITIE.SPEC:
        loadSpecs();
        return;
      case EEDITED_ENTITIE.TECH:
        loadTechs();
        return;
    }
  }, [choosenEntitie, loadSpecs, loadTechs]);

  useEffect(() => {
    loadEntitie();
  }, [loadEntitie]);

  return (
    <div className={'flex flex-col h-full items-center overflow-hidden'}>
      <div className={'text-5xl'}>Изменение сущностей</div>
      <div className={'text-2xl mt-2'}>Выберите сущность</div>
      <div
        className={
          'grid grid-flow-col auto-cols-auto-fit auto-cols-[minmax(150px,max-content)] justify-center w-full gap-y-2 gap-x-2 mt-4'
        }
      >
        {entitiesListButtons.map((button) => (
          <CustomButton
            text={button.text}
            key={button.id}
            selected={button.id === choosenEntitie}
            onClick={() => setChoosenEntitie(button.id)}
          />
        ))}
      </div>
      <div className={'overflow-auto w-full px-4 mt-4'}>
        {choosenEntitie === EEDITED_ENTITIE.SPEC &&
          specs.map((spec) => (
            <div
              key={spec.id}
              className={'border-1 w-full flex justify-between items-center px-4'}
            >
              <div className={'text-3xl'}>{spec.name}</div>
              <div className={'flex flex-col'}>
                <CustomButton
                  text={'Изменить'}
                  className={'mb-2'}
                />
                <CustomButton
                  type={'error'}
                  text={'Удалить'}
                />
              </div>
            </div>
          ))}
        {choosenEntitie === EEDITED_ENTITIE.TECH &&
          techs.map((tech) => (
            <div
              key={tech.id}
              className={'border-1 w-full flex justify-between items-center'}
            >
              <div className={'text-3xl mr-4'}>{tech.name}</div>
              <div className={'text-2xl'}>{`Описание: ${tech.description || 'Не заполнено'}`}</div>
              <div className={'flex flex-col'}>
                <CustomButton
                  text={'Изменить'}
                  className={'mb-2'}
                />
                <CustomButton
                  type={'error'}
                  text={'Удалить'}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditEntitiesView;
