import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { components } from '@mar/shared';
import { StudyForm } from './study-form';
import { StudyPreview } from './study-preview';

type CreateStudyDto = components['schemas']['CreateStudyDto'];

const App = () => {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<CreateStudyDto>({
    title: '',
    link: '',
    duration: 0,
    reward: 0,
    deadline: '',
    targeting: [],
    quotas: [],
  });

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <StudyForm id={id} onIdChange={setId} data={data} onChange={setData} />
      <StudyPreview data={data} />
    </div>
  );
};

const root = document.getElementById('root')!;
createRoot(root).render(<App />);
