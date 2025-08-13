import { Study } from '../types';
import { t } from '../i18n';

interface Props {
  study: Study;
  onOpen: (id: number) => void;
  onStart: (id: number) => void;
  onFinish: (id: number) => void;
}

const statusLabels: Record<Study['status'], string> = {
  sent: t('studies.card.statusLabels.sent'),
  opened: t('studies.card.statusLabels.opened'),
  started: t('studies.card.statusLabels.started'),
  finished: t('studies.card.statusLabels.finished'),
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
      <p>
        {t('studies.card.duration')}: {study.duration} {t('studies.card.minutes')}
      </p>
      <p>
        {t('studies.card.reward')}: {study.reward} ₽
      </p>
      <p>
        {t('studies.card.deadline')}: {study.deadline}
      </p>
      <p>
        {t('studies.card.status')}: {statusLabels[study.status]}
      </p>
      {(study.status === 'sent' || study.status === 'opened') && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart(study.id);
          }}
        >
          {t('common.joinStudy')}
        </button>
      )}
      {study.status === 'started' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFinish(study.id);
          }}
        >
          {t('studies.card.finish')}
        </button>
      )}
    </div>
  );
}
