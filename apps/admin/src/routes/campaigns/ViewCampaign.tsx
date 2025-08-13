import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import {
  getCampaign,
  listCampaignEvents,
  launchCampaign,
  stopCampaign,
} from '../../api/client';
import type { components } from '@mar/shared';
import { t } from '../../i18n';

type CampaignDto = components['schemas']['CampaignDto'];
type NotificationEventDto = components['schemas']['NotificationEventDto'];

export default function ViewCampaign() {
  const { id } = useParams({ from: '/campaigns/$id' });
  const [campaign, setCampaign] = useState<CampaignDto | null>(null);
  const [events, setEvents] = useState<NotificationEventDto[]>([]);
  useEffect(() => {
    getCampaign(id).then(setCampaign);
    listCampaignEvents(id).then(setEvents);
  }, [id]);
  if (!campaign) return <div>Loading...</div>;
  return (
    <div>
      <h2>{campaign.name}</h2>
      <div>
        {t('campaigns.view.status')}: {campaign.status}
      </div>
      {campaign.status === 'draft' && (
        <button
          onClick={async () => {
            await launchCampaign(campaign.id);
            setCampaign({ ...campaign, status: 'launched' });
          }}
        >
          {t('campaigns.view.launch')}
        </button>
      )}
      {campaign.status === 'launched' && (
        <button
          onClick={async () => {
            await stopCampaign(campaign.id);
            setCampaign({ ...campaign, status: 'stopped' });
          }}
        >
          {t('campaigns.view.stop')}
        </button>
      )}
      <h3>{t('campaigns.view.events')}</h3>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            {e.status}
            {e.error ? `: ${e.error}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
