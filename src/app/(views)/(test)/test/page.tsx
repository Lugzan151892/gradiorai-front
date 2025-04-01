'use client';

import React, { useState } from 'react';
import SettingsBlock from './components/SettingsBlock';
import { ESKILL_LEVEL } from '@/core/interfaces/enums';
import CustomFilterButton from '@/components/ui/filter-button/CustomFilterButton';
import TechComponent from '../../(tests)/tests/components/TechComponent';

const TestsView = () => {
  const [questionsLevel, setQuestionsLevel] = useState<ESKILL_LEVEL[]>([]);
  const [questionsSpec, setQuestionsSpec] = useState<ESKILL_LEVEL[]>([]);

  const handleSetQuestionsLevel = (val: ESKILL_LEVEL) => {
    if (questionsLevel.includes(val)) {
      setQuestionsLevel([...questionsLevel.filter((el) => el !== val)]);
    } else {
      setQuestionsLevel([...questionsLevel, val]);
    }
  };

  const handleSetQuestionsSpec = (val: ESKILL_LEVEL) => {
    if (questionsSpec.includes(val)) {
      setQuestionsSpec([...questionsSpec.filter((el) => el !== val)]);
    } else {
      setQuestionsSpec([...questionsSpec, val]);
    }
  };

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

  const specs = [
    {
      id: ESKILL_LEVEL.JUNIOR,
      name: 'Junior',
    },
    {
      id: ESKILL_LEVEL.MIDDLE,
      name: 'Middle',
    },
    {
      id: ESKILL_LEVEL.SENIOR,
      name: 'Senior',
    },
  ];

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
              selected={questionsLevel.includes(level.id)}
              onClick={() => handleSetQuestionsLevel(level.id)}
            />
          ))}
        </div>
      </SettingsBlock>
      <SettingsBlock
        icon={'monitor'}
        title={'Специализация'}
        description={'Здесь вы можете отфильтровать направления подходящие под  специализацию '}
      >
        {specs.length ? (
          <div className={'flex gap-5 mt-9'}>
            {specs.map((tech) => (
              <TechComponent
                tech={tech}
                key={tech.id}
                selected={questionsSpec.includes(tech.id)}
                onClick={() => handleSetQuestionsSpec(tech.id)}
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
      >
        first block
      </SettingsBlock>
      <SettingsBlock icon={'rocket'}>first block</SettingsBlock>
    </div>
  );
};

export default TestsView;
