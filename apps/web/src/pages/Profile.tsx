import { useEffect, useState, type ChangeEvent } from 'react';
import { Link } from '@tanstack/react-router';
import type { components } from '@mar/shared';
import { t } from '../i18n';
import consentText from '../../../../legal/consent_v1.md?raw';

type Profile = components['schemas']['ProfileDto'];
type PrescreenBlock = components['schemas']['PrescreenBlockDto'];

export default function ProfilePage() {
  async function enableNotifications() {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      alert(t('common.error'));
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    const key = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });
    await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
    alert(t('common.saved'));
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }

  const [consent, setConsent] = useState(false);
  const [consentStatus, setConsentStatus] = useState('');

  async function handleConsent(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setConsent(checked);
    if (!checked) {
      setConsentStatus('');
      return;
    }
    try {
      const enc = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(consentText));
      const hashArray = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      await fetch('/api/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: 'v1',
          textHash: hashArray,
          givenAt: new Date().toISOString(),
        }),
      });
      setConsentStatus('Согласие сохранено');
    } catch {
      setConsentStatus('Ошибка сохранения');
    }
  }

  return (
    <div>
      <h2>{t('sections.profile')}</h2>

      <p>
        <Link to="/legal/privacy">Политика приватности</Link>
      </p>

      <div>
        <label>
          <input type="checkbox" checked={consent} onChange={handleConsent} /> Согласен с
          обработкой данных (v1)
        </label>
        {consentStatus && <div>{consentStatus}</div>}
      </div>

      <button onClick={enableNotifications}>{t('common.enableNotifications')}</button>

      <ProfileForm />

      <h3>{t('sections.prescreen')}</h3>
      <PrescreenForm />
    </div>
  );
}

function ProfileForm() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    age: 0,
    gender: '',
    city: '',
    profession: '',
    contacts: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => setProfile(data));
  }, []);

  function validate<K extends keyof Profile>(key: K, value: Profile[K]) {
    let error = '';
    if (key === 'name' && !value) error = 'Введите имя';
    if (key === 'age' && (!value || Number(value) <= 0)) error = 'Введите возраст';
    if (key === 'gender' && !value) error = 'Введите пол';
    if (key === 'city' && !value) error = 'Введите город';
    if (key === 'profession' && !value) error = 'Введите профессию';
    if (key === 'contacts' && !value) error = 'Введите контакты';
    setErrors((e) => ({ ...e, [key]: error }));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const key = name as keyof Profile;
    const parsed = key === 'age' ? Number(value) : value;
    setProfile((p) => ({ ...p, [key]: parsed }));
    validate(key, parsed as never);
  }

  useEffect(() => {
    const tmr = setTimeout(() => {
      if (Object.values(errors).every((e) => !e)) {
        fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        }).catch(() => {});
      }
    }, 500);
    return () => clearTimeout(tmr);
  }, [profile, errors]);

  return (
    <form>
      <div>
        <label>
          Имя
          <input name="name" value={profile.name} onChange={handleChange} />
        </label>
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label>
          Возраст
          <input name="age" type="number" value={profile.age} onChange={handleChange} />
        </label>
        {errors.age && <div>{errors.age}</div>}
      </div>
      <div>
        <label>
          Пол
          <input name="gender" value={profile.gender} onChange={handleChange} />
        </label>
        {errors.gender && <div>{errors.gender}</div>}
      </div>
      <div>
        <label>
          Город
          <input name="city" value={profile.city} onChange={handleChange} />
        </label>
        {errors.city && <div>{errors.city}</div>}
      </div>
      <div>
        <label>
          Профессия
          <input name="profession" value={profile.profession} onChange={handleChange} />
        </label>
        {errors.profession && <div>{errors.profession}</div>}
      </div>
      <div>
        <label>
          Контакты
          <input name="contacts" value={profile.contacts} onChange={handleChange} />
        </label>
        {errors.contacts && <div>{errors.contacts}</div>}
      </div>
    </form>
  );
}

function PrescreenForm() {
  const [blocks, setBlocks] = useState<PrescreenBlock[]>([]);

  useEffect(() => {
    fetch('/api/prescreen')
      .then((r) => r.json())
      .then((data) => setBlocks(data));
  }, []);

  return (
    <div>
      {blocks.map((b) => (
        <PrescreenBlockItem key={b.id} block={b} />
      ))}
    </div>
  );
}

function PrescreenBlockItem({ block }: { block: PrescreenBlock }) {
  const [answer, setAnswer] = useState(block.answer);
  const [error, setError] = useState('');

  useEffect(() => {
    const tmr = setTimeout(() => {
      if (!answer) {
        setError('Обязательное поле');
        return;
      }
      setError('');
      fetch(`/api/prescreen/${block.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      }).catch(() => setError('Ошибка сохранения'));
    }, 500);
    return () => clearTimeout(tmr);
  }, [answer, block.id]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>{block.question}</div>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      {error && <div>{error}</div>}
    </div>
  );
}
