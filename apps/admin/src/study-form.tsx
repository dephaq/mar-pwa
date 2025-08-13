import React from 'react';
import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];
type StudyDto = components['schemas']['StudyDto'];

interface Props {
  id: string | null;
  onIdChange: (id: string | null) => void;
  data: CreateStudyDto;
  onChange: (data: CreateStudyDto) => void;
}

export const StudyForm: React.FC<Props> = ({ id, onIdChange, data, onChange }) => {
  const updateField = <K extends keyof CreateStudyDto>(key: K, value: CreateStudyDto[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateTargeting = (
    index: number,
    field: keyof CreateStudyDto['targeting'][number],
    value: string,
  ) => {
    const targeting = data.targeting.slice();
    targeting[index] = { ...targeting[index], [field]: value };
    updateField('targeting', targeting);
  };

  const addTargeting = () => updateField('targeting', [...data.targeting, { key: '', value: '' }]);

  const updateQuotaLimit = (index: number, value: number) => {
    const quotas = data.quotas.slice();
    quotas[index] = { ...quotas[index], limit: value };
    updateField('quotas', quotas);
  };

  const updateQuotaAttr = (
    quotaIndex: number,
    attrIndex: number,
    field: 'key' | 'value',
    value: string,
  ) => {
    const quotas = data.quotas.slice();
    const attrs = quotas[quotaIndex].attributes.slice();
    attrs[attrIndex] = { ...attrs[attrIndex], [field]: value };
    quotas[quotaIndex] = { ...quotas[quotaIndex], attributes: attrs };
    updateField('quotas', quotas);
  };

  const addQuota = () => updateField('quotas', [...data.quotas, { limit: 0, attributes: [] }]);

  const addQuotaAttr = (quotaIndex: number) => {
    const quotas = data.quotas.slice();
    const attrs = [...quotas[quotaIndex].attributes, { key: '', value: '' }];
    quotas[quotaIndex] = { ...quotas[quotaIndex], attributes: attrs };
    updateField('quotas', quotas);
  };

  const save = async () => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/studies/${id}` : '/api/studies';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const saved: StudyDto = await res.json();
    onIdChange(saved.id);
  };

  const load = async () => {
    if (!id) return;
    const res = await fetch(`/api/studies/${id}`);
    const loaded: StudyDto = await res.json();
    onChange({
      title: loaded.title,
      link: loaded.link,
      duration: loaded.duration,
      reward: loaded.reward,
      deadline: loaded.deadline,
      targeting: loaded.targeting,
      quotas: loaded.quotas,
    });
  };

  return (
    <div>
      <h2>Новое исследование</h2>
      <div>
        <label>ID: </label>
        <input value={id || ''} onChange={(e) => onIdChange(e.target.value || null)} />
        <button type="button" onClick={load}>
          Загрузить
        </button>
      </div>
      <div>
        <label>Тема: </label>
        <input value={data.title} onChange={(e) => updateField('title', e.target.value)} />
      </div>
      <div>
        <label>Ссылка: </label>
        <input value={data.link} onChange={(e) => updateField('link', e.target.value)} />
      </div>
      <div>
        <label>Длительность (мин): </label>
        <input
          type="number"
          value={data.duration}
          onChange={(e) => updateField('duration', Number(e.target.value))}
        />
      </div>
      <div>
        <label>Вознаграждение: </label>
        <input
          type="number"
          value={data.reward}
          onChange={(e) => updateField('reward', Number(e.target.value))}
        />
      </div>
      <div>
        <label>Дедлайн: </label>
        <input
          type="datetime-local"
          value={data.deadline}
          onChange={(e) => updateField('deadline', e.target.value)}
        />
      </div>
      <div>
        <h3>Таргетинг</h3>
        {data.targeting.map((attr, i) => (
          <div key={i}>
            <input
              placeholder="key"
              value={attr.key}
              onChange={(e) => updateTargeting(i, 'key', e.target.value)}
            />
            <input
              placeholder="value"
              value={attr.value}
              onChange={(e) => updateTargeting(i, 'value', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addTargeting}>
          Добавить атрибут
        </button>
      </div>
      <div>
        <h3>Квоты</h3>
        {data.quotas.map((quota, qi) => (
          <div
            key={qi}
            style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}
          >
            <div>
              <label>Лимит: </label>
              <input
                type="number"
                value={quota.limit}
                onChange={(e) => updateQuotaLimit(qi, Number(e.target.value))}
              />
            </div>
            {quota.attributes.map((attr, ai) => (
              <div key={ai}>
                <input
                  placeholder="key"
                  value={attr.key}
                  onChange={(e) => updateQuotaAttr(qi, ai, 'key', e.target.value)}
                />
                <input
                  placeholder="value"
                  value={attr.value}
                  onChange={(e) => updateQuotaAttr(qi, ai, 'value', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={() => addQuotaAttr(qi)}>
              Добавить атрибут страты
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuota}>
          Добавить квоту
        </button>
      </div>
      <button type="button" onClick={save}>
        Сохранить
      </button>
    </div>
  );
};
