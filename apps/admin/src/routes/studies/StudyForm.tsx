import React, { useState } from 'react';
import type { components } from '@mar/shared';
import { t } from '../../i18n';

type CreateStudyDto = components['schemas']['CreateStudyDto'];

interface Props {
  initial?: Partial<CreateStudyDto>;
  onSubmit: (data: CreateStudyDto) => void | Promise<void>;
}

const toInputDateTime = (value?: string) =>
  value ? value.slice(0, 16) : '';

export default function StudyForm({ initial = {}, onSubmit }: Props) {
  const [title, setTitle] = useState(initial.title ?? '');
  const [link, setLink] = useState(initial.link ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [durationMin, setDurationMin] = useState(
    initial.durationMin?.toString() ?? ''
  );
  const [rewardCents, setRewardCents] = useState(
    initial.rewardCents?.toString() ?? ''
  );
  const [deadlineAt, setDeadlineAt] = useState(toInputDateTime(initial.deadlineAt));
  const [targeting, setTargeting] = useState(
    initial.targeting ? JSON.stringify(initial.targeting, null, 2) : ''
  );
  const [quotas, setQuotas] = useState(
    initial.quotas ? JSON.stringify(initial.quotas, null, 2) : ''
  );
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: CreateStudyDto = {
        title,
        link,
        description: description || undefined,
        durationMin: durationMin ? Number(durationMin) : undefined,
        rewardCents: rewardCents ? Number(rewardCents) : undefined,
        deadlineAt: deadlineAt ? new Date(deadlineAt).toISOString() : undefined,
        targeting: targeting ? JSON.parse(targeting) : undefined,
        quotas: quotas ? JSON.parse(quotas) : undefined,
      };
      onSubmit(payload);
    } catch (err) {
      setError(t('studies.form.errors.invalidJson'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label>
        {t('studies.form.title')}*
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        {t('studies.form.link')}*
        <input value={link} onChange={(e) => setLink(e.target.value)} required />
      </label>
      <label>
        {t('studies.form.description')}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        {t('studies.form.durationMin')}
        <input
          type="number"
          value={durationMin}
          onChange={(e) => setDurationMin(e.target.value)}
        />
      </label>
      <label>
        {t('studies.form.rewardCents')}
        <input
          type="number"
          value={rewardCents}
          onChange={(e) => setRewardCents(e.target.value)}
        />
      </label>
      <label>
        {t('studies.form.deadline')}
        <input
          type="datetime-local"
          value={deadlineAt}
          onChange={(e) => setDeadlineAt(e.target.value)}
        />
      </label>
      <label>
        {t('studies.form.targeting')}
        <textarea value={targeting} onChange={(e) => setTargeting(e.target.value)} />
      </label>
      <label>
        {t('studies.form.quotas')}
        <textarea value={quotas} onChange={(e) => setQuotas(e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit">{t('studies.form.save')}</button>
        <button type="button" onClick={() => setPreview((p) => !p)}>
          {t('studies.form.preview')}
        </button>
      </div>
      {preview && (
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>{title}</h3>
          <p>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          </p>
          {durationMin && (
            <p>
              {t('studies.form.durationMin')}: {durationMin}
            </p>
          )}
          {rewardCents && (
            <p>
              {t('studies.form.rewardCents')}: {rewardCents}¢
            </p>
          )}
          {deadlineAt && (
            <p>
              {t('studies.form.deadline')}: {deadlineAt}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
