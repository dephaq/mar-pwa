import { Study } from '../types';

interface Props {
  study: Study;
  onOpen: (id: number) => void;
  onStart: (id: number) => void;
  onFinish: (id: number) => void;
}

const statusLabels: Record<Study['status'], string> = {
  sent: 'Новое',
  opened: 'Открыто',
  started: 'В процессе',
  finished: 'Завершено',
};

export default function StudyCard({ study, onOpen, onStart, onFinish }: Props) {
  return (
    <div
      onClick={() => onOpen(study.id)}
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
        cursor: 'pointer',
      }}
    >
      <h3>{study.topic}</h3>
      <p>Длительность: {study.duration} мин</p>
      <p>Вознаграждение: {study.reward} ₽</p>
      <p>Дедлайн: {study.deadline}</p>
      <p>Статус: {statusLabels[study.status]}</p>
      {(study.status === 'sent' || study.status === 'opened') && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart(study.id);
          }}
        >
          Принять участие
        </button>
      )}
      {study.status === 'started' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFinish(study.id);
          }}
        >
          Завершить
        </button>
      )}
    </div>
  );
}
