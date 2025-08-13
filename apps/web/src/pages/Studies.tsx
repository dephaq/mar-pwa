import { useEffect, useState } from 'react';
import StudyCard from '../components/StudyCard';
import { Study, StudyStatus } from '../types';
import { trackEvent } from '../lib/analytics';

const initialStudies: Study[] = [
  {
    id: 1,
    topic: 'UX интервью',
    duration: 30,
    reward: 500,
    deadline: '2024-12-31',
    status: 'sent',
  },
  {
    id: 2,
    topic: 'Тестирование прототипа',
    duration: 15,
    reward: 300,
    deadline: '2024-11-30',
    status: 'sent',
  },
];

export default function Studies() {
  const [filter, setFilter] = useState<'all' | StudyStatus>('all');
  const [studies, setStudies] = useState<Study[]>(initialStudies);

  // отправляем события приглашений один раз при инициализации
  useEffect(() => {
    studies.forEach((study) => trackEvent('invite_sent', { id: study.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (id: number) => {
    const study = studies.find((s) => s.id === id);
    if (study && study.status === 'sent') {
      trackEvent('invite_opened', { id });
      setStudies((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: 'opened' } : s)),
      );
    }
  };

  const handleStart = (id: number) => {
    const study = studies.find((s) => s.id === id);
    if (study && study.status === 'sent') {
      trackEvent('invite_opened', { id });
    }
    trackEvent('invite_started', { id });
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'started' } : s)),
    );
  };

  const handleFinish = (id: number) => {
    trackEvent('invite_finished', { id });
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'finished' } : s)),
    );
  };

  const filtered = studies.filter((s) =>
    filter === 'all' ? true : s.status === filter,
  );

  return (
    <div>
      <h2>Исследования</h2>
      <label>
        Фильтр:{' '}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | StudyStatus)}
        >
          <option value="all">Все</option>
          <option value="sent">Новые</option>
          <option value="opened">Открытые</option>
          <option value="started">В процессе</option>
          <option value="finished">Завершённые</option>
        </select>
      </label>
      <div>
        {filtered.map((study) => (
          <StudyCard
            key={study.id}
            study={study}
            onOpen={handleOpen}
            onStart={handleStart}
            onFinish={handleFinish}
          />
        ))}
      </div>
    </div>
  );
}
