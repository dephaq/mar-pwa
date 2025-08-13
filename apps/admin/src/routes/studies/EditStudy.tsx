import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import StudyForm from './StudyForm';
import { getStudy, updateStudy } from '../../api/client';
import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];

export default function EditStudy() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/studies/$id/edit' });
  const [initial, setInitial] = useState<CreateStudyDto | null>(null);

  useEffect(() => {
    getStudy(id).then(setInitial);
  }, [id]);

  const handleSubmit = async (data: CreateStudyDto) => {
    await updateStudy(id, data);
    navigate({ to: '/studies' });
  };

  if (!initial) return <div>Loading...</div>;

  return <StudyForm initial={initial} onSubmit={handleSubmit} />;
}
