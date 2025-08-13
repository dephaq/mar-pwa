import { useEffect, useState } from 'react';
import { listCampaigns, launchCampaign, stopCampaign } from '../../api/client';
import { Link } from '@tanstack/react-router';
import type { components } from '@mar/shared';
import { t } from '../../i18n';

type CampaignDto = components['schemas']['CampaignDto'];

export default function CampaignsList() {
  const [items, setItems] = useState<CampaignDto[]>([]);
  useEffect(() => {
    listCampaigns().then(setItems).catch(() => {});
  }, []);
  return (
    <div>
      <h2>{t('sections.campaigns')}</h2>
      <Link to="/campaigns/new">{t('campaigns.list.new')}</Link>
      <table>
        <thead>
          <tr>
            <th>{t('campaigns.list.name')}</th>
            <th>{t('campaigns.list.status')}</th>
            <th>{t('campaigns.list.created')}</th>
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
                  {t('campaigns.list.view')}
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
                    {t('campaigns.list.launch')}
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
                    {t('campaigns.list.stop')}
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
