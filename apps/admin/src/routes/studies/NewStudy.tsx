import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import StudyForm from './StudyForm';
import { createStudy } from '../../api/client';
import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];

export default function NewStudy() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateStudyDto) => {
    await createStudy(data);
    navigate({ to: '/studies' });
  };

  return <StudyForm onSubmit={handleSubmit} />;
}
