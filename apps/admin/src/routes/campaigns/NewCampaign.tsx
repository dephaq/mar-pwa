import { useNavigate } from '@tanstack/react-router';
import CampaignForm from './CampaignForm';
import { createCampaign } from '../../api/client';
import { t } from '../../i18n';

export default function NewCampaign() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>{t('campaigns.new.heading')}</h2>
      <CampaignForm
        onSubmit={async (data) => {
          await createCampaign(data);
          alert(t('common.saved'));
          navigate({ to: '/campaigns' });
        }}
      />
    </div>
  );
}
