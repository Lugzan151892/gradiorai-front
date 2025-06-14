'use client';

import UIButton from '@/components/ui/button/UIButton';
import React, { useCallback, useEffect, useState } from 'react';
import { entitiesListButtons } from '@/app/(views)/system/edit-entities/utils';
import { EEDITED_ENTITIE } from '@/app/(views)/system/edit-entities/interfaces';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import errorHandler from '@/core/utils/error/errorHandler';
import { ISpecialization, ITechWithCount } from '@/core/interfaces/types';
import { openModal } from '@/store/tech/techSlice';
import AddSpecModal from '@/components/specialization-modals/AddSpecModal';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';
import ScrollContainer from '@/components/ui/scrollarea/CustomScrollarea';
import UIFilterButton from '@/components/ui/filter-button/UIFilterButton';

const EditEntitiesView = () => {
  const [choosenEntitie, setChoosenEntitie] = useState<EEDITED_ENTITIE>();
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [techs, setTechs] = useState<ITechWithCount[]>([]);
  const dispatch = useAppDispatch();

  const [currentSpecialization, setCurrentSpecialization] = useState<null | ISpecialization>(null);
  const [openSpecModal, setOpenSpecModal] = useState(false);
  const [currentTechnology, setCurrentTechnology] = useState<null | ITechWithCount>(null);
  const [openTechModal, setOpenTechModal] = useState(false);

  const loadSpecs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<object, ISpecialization[]>('/questions/get-specs');
      setSpecs(result.payload);
    } catch (e) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const loadTechs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await Api.get<object, { techs: ITechWithCount[]; questions_amount: number }>(
        '/questions/get-techs'
      );
      setTechs(result.payload.techs);
    } catch (e) {
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

  const handleEditTechnology = (tech: ITechWithCount) => {
    if (!tech) {
      return;
    }
    setCurrentTechnology(tech);
    setOpenTechModal(true);
  };

  const handleDeleteTechnology = async (id: number) => {
    try {
      const result = await Api.delete<{ id: number }, { message: string }>('/questions/delete-tech', { id });

      dispatch(
        openModal({
          text: result.payload.message,
        })
      );

      loadEntitie();
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  const handleEditSpecialization = (spec: ISpecialization) => {
    if (!spec) {
      return;
    }
    setCurrentSpecialization(spec);
    setOpenSpecModal(true);
  };

  const handleDeleteSpecialization = async (id: number) => {
    try {
      const result = await Api.delete<{ id: number }, { message: string }>('/questions/delete-spec', { id });

      dispatch(
        openModal({
          text: result.payload.message,
        })
      );

      loadEntitie();
    } catch (e) {
      errorHandler(e, dispatch);
    }
  };

  useEffect(() => {
    loadEntitie();
  }, [loadEntitie]);

  return (
    <div className={'flex flex-col h-full items-center'}>
      <div className={'text-5xl'}>Изменение сущностей</div>
      <div className={'text-2xl mt-2'}>Выберите сущность</div>
      <div
        className={
          'grid grid-flow-col auto-cols-auto-fit auto-cols-[minmax(150px,max-content)] justify-center w-full gap-y-2 gap-x-2 mt-4'
        }
      >
        {entitiesListButtons.map((button) => (
          <UIFilterButton
            text={button.text}
            key={button.id}
            selected={button.id === choosenEntitie}
            onClick={() => setChoosenEntitie(button.id)}
          />
        ))}
      </div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollContainer>
          <div className={'mb-4 relative bg-modal'}>
            {choosenEntitie === EEDITED_ENTITIE.TECH && (
              <div className={'sticky top-0 left-0 border grid grid-cols-[5%_20%_40%_25%_10%] min-h-8 border bg-modal'}>
                <div className={'text-2xl border-r text-center'}>ID</div>
                <div className={'text-2xl border-r px-2'}>Название</div>
                <div className={'text-2xl border-r px-2'}>Описание</div>
                <div className={'text-2xl border-r px-2'}>Кол-во сохраненных вопросов</div>
                <div className={'text-2xl text-center'}>Действия</div>
              </div>
            )}
            {choosenEntitie === EEDITED_ENTITIE.SPEC && (
              <div className={'sticky top-0 left-0 border grid grid-cols-[5%_1fr_10%] min-h-8 border bg-modal'}>
                <div className={'text-2xl border-r text-center'}>ID</div>
                <div className={'text-2xl border-r px-2'}>Название</div>
                <div className={'text-2xl text-center'}>Действия</div>
              </div>
            )}
            {choosenEntitie === EEDITED_ENTITIE.SPEC &&
              specs.map((spec) => (
                <div
                  key={spec.id}
                  className={'border w-full grid grid-cols-[5%_1fr_10%]'}
                >
                  <div className={'text-3xl border-r px-2 py-2 text-center'}>{spec.id}</div>
                  <div className={'text-3xl border-r px-2 py-2'}>{spec.name}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <UIButton
                      text={'Изменить'}
                      className={'mb-2'}
                      onClick={() => handleEditSpecialization(spec)}
                    />
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteSpecialization(spec.id)}
                    />
                  </div>
                </div>
              ))}
            {choosenEntitie === EEDITED_ENTITIE.TECH &&
              techs.map((tech) => (
                <div
                  key={tech.id}
                  className={'border w-full grid grid-cols-[5%_20%_40%_25%_10%]'}
                >
                  <div className={'text-3xl border-r px-2 py-2 text-center'}>{tech.id}</div>
                  <div className={'text-3xl border-r px-2 py-2'}>{tech.name}</div>
                  <div className={'text-2xl border-r px-2 py-2'}>{tech.description || 'Не заполнено'}</div>
                  <div className={'text-2xl border-r px-2 py-2 text-center'}>{tech._count?.questions || '0'}</div>
                  <div className={'flex flex-col px-2 py-2'}>
                    <UIButton
                      text={'Изменить'}
                      className={'mb-2'}
                      onClick={() => handleEditTechnology(tech)}
                    />
                    <UIButton
                      text={'Удалить'}
                      onClick={() => handleDeleteTechnology(tech.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </ScrollContainer>
      </div>
      {currentSpecialization && (
        <AddSpecModal
          type={'edit'}
          specialization={currentSpecialization}
          open={openSpecModal}
          onClose={() => {
            setOpenSpecModal(false);
            loadEntitie();
          }}
        />
      )}
      {currentTechnology && (
        <AddTechnologyModal
          type={'edit'}
          technology={currentTechnology}
          open={openTechModal}
          onClose={() => {
            setOpenTechModal(false);
            loadEntitie();
          }}
        />
      )}
    </div>
  );
};

export default EditEntitiesView;
