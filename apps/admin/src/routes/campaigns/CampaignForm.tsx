import { useState } from 'react';
import type { components } from '@mar/shared';

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
        Имя
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        Study ID
        <input name="studyId" value={form.studyId || ''} onChange={handleChange} />
      </label>
      <label>
        Segment (JSON)
        <textarea name="segment" value={form.segment ? JSON.stringify(form.segment) : ''} onChange={handleChange} />
      </label>
      <label>
        Throttle per minute
        <input
          type="number"
          name="throttlePerMinute"
          value={form.throttlePerMinute || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Title
        <input name="message.title" value={form.message.title} onChange={handleChange} />
      </label>
      <label>
        Body
        <input name="message.body" value={form.message.body} onChange={handleChange} />
      </label>
      <label>
        URL
        <input name="message.url" value={form.message.url || ''} onChange={handleChange} />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
}
