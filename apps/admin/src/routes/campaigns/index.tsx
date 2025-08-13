import { useEffect, useState } from 'react';
import { listCampaigns, launchCampaign, stopCampaign } from '../../api/client';
import { Link } from '@tanstack/react-router';
import type { components } from '@mar/shared';

type CampaignDto = components['schemas']['CampaignDto'];

export default function CampaignsList() {
  const [items, setItems] = useState<CampaignDto[]>([]);
  useEffect(() => {
    listCampaigns().then(setItems).catch(() => {});
  }, []);
  return (
    <div>
      <h2>Кампании</h2>
      <Link to="/campaigns/new">Новая</Link>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Статус</th>
            <th>Создана</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.createdAt}</td>
              <td style={{ display: 'flex', gap: 8 }}>
                <Link to="/campaigns/$id" params={{ id: c.id }}>
                  View
                </Link>
                {c.status === 'draft' && (
                  <button
                    onClick={async () => {
                      await launchCampaign(c.id);
                      setItems((items) =>
                        items.map((i) =>
                          i.id === c.id ? { ...i, status: 'launched' } : i
                        )
                      );
                    }}
                  >
                    Launch
                  </button>
                )}
                {c.status === 'launched' && (
                  <button
                    onClick={async () => {
                      await stopCampaign(c.id);
                      setItems((items) =>
                        items.map((i) =>
                          i.id === c.id ? { ...i, status: 'stopped' } : i
                        )
                      );
                    }}
                  >
                    Stop
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
