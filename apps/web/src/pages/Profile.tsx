import { useEffect, useState } from 'react';
import type { components } from '@mar/shared';

type Profile = components['schemas']['ProfileDto'];
type PrescreenBlock = components['schemas']['PrescreenBlockDto'];

export default function ProfilePage() {
  return (
    <div>
      <h2>Профиль</h2>
      <ProfileForm />
      <h3>Прескрин</h3>
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const key = name as keyof Profile;
    const parsed = key === 'age' ? Number(value) : value;
    setProfile((p) => ({ ...p, [key]: parsed }));
    validate(key, parsed as never);
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (Object.values(errors).every((e) => !e)) {
        fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        }).catch(() => {});
      }
    }, 500);
    return () => clearTimeout(t);
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
          <input
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
          />
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
          <input
            name="profession"
            value={profile.profession}
            onChange={handleChange}
          />
        </label>
        {errors.profession && <div>{errors.profession}</div>}
      </div>
      <div>
        <label>
          Контакты
          <input
            name="contacts"
            value={profile.contacts}
            onChange={handleChange}
          />
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
    const t = setTimeout(() => {
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
    return () => clearTimeout(t);
  }, [answer, block.id]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>{block.question}</div>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      {error && <div>{error}</div>}
    </div>
  );
}
