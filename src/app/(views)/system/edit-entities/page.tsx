'use client';

import CustomButton from '@/components/ui/button/CustomButton';
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
      const result = await Api.get<null, { techs: ITechWithCount[]; questions_amount: number }>('/questions/get-techs');
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
    } catch (e: any) {
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
    } catch (e: any) {
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
          <CustomButton
            text={button.text}
            key={button.id}
            selected={button.id === choosenEntitie}
            onClick={() => setChoosenEntitie(button.id)}
          />
        ))}
      </div>
      <div className={'w-full px-4 mt-4 h-full overflow-hidden'}>
        <ScrollContainer>
          <div className={'mb-4'}>
            {choosenEntitie === EEDITED_ENTITIE.SPEC &&
              specs.map((spec) => (
                <div
                  key={spec.id}
                  className={'border-1 w-full flex justify-between items-center px-4 py-1'}
                >
                  <div className={'text-3xl'}>{spec.name}</div>
                  <div className={'flex flex-col'}>
                    <CustomButton
                      text={'Изменить'}
                      className={'mb-2'}
                      onClick={() => handleEditSpecialization(spec)}
                    />
                    <CustomButton
                      type={'error'}
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
                  className={'border-1 w-full flex justify-between items-center px-4 py-1'}
                >
                  <div className={'text-3xl mr-4'}>{tech.name}</div>
                  <div className={'text-2xl'}>{`Описание: ${tech.description || 'Не заполнено'}`}</div>
                  <div className={'text-2xl'}>{`Вопросов в базе: ${tech._count?.questions || '0'}`}</div>
                  <div className={'flex flex-col'}>
                    <CustomButton
                      text={'Изменить'}
                      className={'mb-2'}
                      onClick={() => handleEditTechnology(tech)}
                    />
                    <CustomButton
                      type={'error'}
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
