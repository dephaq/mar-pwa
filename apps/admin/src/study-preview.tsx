import React from 'react';
import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];

interface Props {
  data: CreateStudyDto;
}

export const StudyPreview: React.FC<Props> = ({ data }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
    <h3>{data.title}</h3>
    <p>Длительность: {data.duration} мин</p>
    <p>Вознаграждение: {data.reward}</p>
    <p>Дедлайн: {data.deadline ? new Date(data.deadline).toLocaleString() : ''}</p>
    <a href={data.link}>{data.link}</a>
  </div>
);
