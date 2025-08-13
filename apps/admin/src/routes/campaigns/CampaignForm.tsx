import { useState } from 'react';
import type { components } from '@mar/shared';
import { t } from '../../i18n';

type CampaignCreateDto = components['schemas']['CampaignCreateDto'];

interface Props {
  onSubmit(data: CampaignCreateDto): void;
  initial?: CampaignCreateDto;
}

export default function CampaignForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState<CampaignCreateDto>(
    initial || { name: '', message: { title: '', body: '', url: '' } }
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name.startsWith('message.')) {
      const key = name.split('.')[1] as 'title' | 'body' | 'url';
      setForm((f) => ({ ...f, message: { ...f.message, [key]: value } }));
    } else if (name === 'segment') {
      try {
        setForm((f) => ({ ...f, segment: value ? JSON.parse(value) : undefined }));
      } catch {
        // ignore parse errors
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <label>
        {t('campaigns.form.name')}
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        {t('campaigns.form.studyId')}
        <input name="studyId" value={form.studyId || ''} onChange={handleChange} />
      </label>
      <label>
        {t('campaigns.form.segment')}
        <textarea name="segment" value={form.segment ? JSON.stringify(form.segment) : ''} onChange={handleChange} />
      </label>
      <label>
        {t('campaigns.form.throttlePerMinute')}
        <input
          type="number"
          name="throttlePerMinute"
          value={form.throttlePerMinute || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        {t('campaigns.form.title')}
        <input name="message.title" value={form.message.title} onChange={handleChange} />
      </label>
      <label>
        {t('campaigns.form.body')}
        <input name="message.body" value={form.message.body} onChange={handleChange} />
      </label>
      <label>
        {t('campaigns.form.url')}
        <input name="message.url" value={form.message.url || ''} onChange={handleChange} />
      </label>
      <button type="submit">{t('campaigns.form.save')}</button>
    </form>
  );
}
