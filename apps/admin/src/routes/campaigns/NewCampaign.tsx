import { useNavigate } from '@tanstack/react-router';
import CampaignForm from './CampaignForm';
import { createCampaign } from '../../api/client';

export default function NewCampaign() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Новая кампания</h2>
      <CampaignForm
        onSubmit={async (data) => {
          await createCampaign(data);
          alert('Сохранено');
          navigate({ to: '/campaigns' });
        }}
      />
    </div>
  );
}
