import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { listStudies } from '../../api/client';
import type { components } from '@mar/shared';

type StudyDto = components['schemas']['StudyDto'];

export default function StudiesList() {
  const [studies, setStudies] = useState<StudyDto[]>([]);

  useEffect(() => {
    listStudies().then(setStudies);
  }, []);

  return (
    <div>
      <h2>Исследования</h2>
      <Link to="/studies/new">Создать</Link>
      <ul>
        {studies.map((s) => (
          <li key={s.id}>
            {s.title} – (
            <Link to="/studies/$id/edit" params={{ id: s.id }}>
              Редактировать
            </Link>
            )
          </li>
        ))}
      </ul>
    </div>
  );
}
