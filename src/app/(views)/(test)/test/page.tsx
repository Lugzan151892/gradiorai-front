'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SettingsBlock from './components/SettingsBlock';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import CustomFilterButton from '@/components/ui/filter-button/CustomFilterButton';
import TechComponent from '../../(tests)/tests/components/TechComponent';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import CustomButton from '@/components/ui/button/CustomButton';
import AddSpecModal from '@/components/specialization-modals/AddSpecModal';
import { useAppDispatch } from '@/hooks/redux';
import { setLoading } from '@/features/loading/loadingSlice';
import Api from '@/core/api/api';
import { ISpecialization, ITechnology } from '@/core/interfaces/types';
import errorHandler from '@/core/utils/error/errorHandler';
import AddTechnologyModal from '@/components/technology-modals/AddTechnologyModal';

const TestsView = () => {
  const dispatch = useAppDispatch();
  const [specs, setSpecs] = useState<ISpecialization[]>([]);
  const [techs, setTechs] = useState<ITechnology[]>([]);
  const [questionsLevel, setQuestionsLevel] = useState<ESKILL_LEVEL>(ESKILL_LEVEL.JUNIOR);
  const [questionsSpecs, setQuestionsSpecs] = useState<ESKILL_LEVEL[]>([]);
  const [questionsTechs, setQuestionsTechs] = useState<number[]>([]);
  const [openAddSpecModal, setOpenAddSpecModal] = useState(false);
  const [openAddTechModal, setOpenAddTechModal] = useState(false);

  const handleSetQuestionsLevel = (val: ESKILL_LEVEL) => {
    setQuestionsLevel(val);
  };

  const handleSetQuestionsSpec = (val: ESKILL_LEVEL) => {
    if (questionsSpecs.includes(val)) {
      setQuestionsSpecs([...questionsSpecs.filter((el) => el !== val)]);
    } else {
      setQuestionsSpecs([...questionsSpecs, val]);
    }
  };

  const handleSetQuestionsTechs = (val: number) => {
    if (questionsTechs.includes(val)) {
      setQuestionsTechs([...questionsTechs.filter((el) => el !== val)]);
    } else {
      setQuestionsTechs([...questionsTechs, val]);
    }
  };

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

  const skillOptions = [
    {
      id: ESKILL_LEVEL.JUNIOR,
      text: 'Junior',
    },
    {
      id: ESKILL_LEVEL.MIDDLE,
      text: 'Middle',
    },
    {
      id: ESKILL_LEVEL.SENIOR,
      text: 'Senior',
    },
  ];

  useEffect(() => {
    loadSpecs();
    loadTechs();
  }, [loadSpecs, loadTechs]);

  return (
    <div className={'flex flex-col w-full h-full gap-y-8'}>
      <SettingsBlock
        icon={'search-book'}
        title={'Уровень вопросов'}
      >
        <div className={'flex gap-10 mt-9'}>
          {skillOptions.map((level) => (
            <CustomFilterButton
              text={level.text}
              key={level.id}
              selected={questionsLevel === level.id}
              onClick={() => handleSetQuestionsLevel(level.id)}
            />
          ))}
        </div>
      </SettingsBlock>
      <SettingsBlock
        icon={'monitor'}
        title={'Специализация'}
        description={'Здесь вы можете отфильтровать направления подходящие под  специализацию '}
        captionAfter={
          <div>
            <AdminWrapper>
              <CustomButton
                small
                text={'Создать специализацию'}
                onClick={() => setOpenAddSpecModal(true)}
              />
            </AdminWrapper>
          </div>
        }
      >
        {specs.length ? (
          <div className={'flex gap-5 mt-9'}>
            {specs.map((spec) => (
              <TechComponent
                tech={spec}
                key={spec.id}
                selected={questionsSpecs.includes(spec.id)}
                onClick={() => handleSetQuestionsSpec(spec.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
      </SettingsBlock>
      <SettingsBlock
        icon={'hut'}
        title={'Направления'}
        description={'Каждое направление включает в себя набор вопросов'}
        captionAfter={
          <div>
            <AdminWrapper>
              <CustomButton
                small
                text={'Создать направление'}
                onClick={() => setOpenAddTechModal(true)}
              />
            </AdminWrapper>
          </div>
        }
      >
        {techs.length ? (
          <div className={'flex gap-5 mt-9'}>
            {techs.map((tech) => (
              <TechComponent
                tech={tech}
                key={tech.id}
                selected={questionsTechs.includes(tech.id)}
                onClick={() => handleSetQuestionsTechs(tech.id)}
              />
            ))}
          </div>
        ) : (
          <div>Специализации не найдены</div>
        )}
      </SettingsBlock>
      <SettingsBlock icon={'rocket'}>first block</SettingsBlock>
      <AddSpecModal
        open={openAddSpecModal}
        onClose={() => {
          setOpenAddSpecModal(false);
          loadSpecs();
        }}
      />
      <AddTechnologyModal
        open={openAddTechModal}
        onClose={() => {
          setOpenAddTechModal(false);
          loadTechs();
        }}
      />
    </div>
  );
};

export default TestsView;
