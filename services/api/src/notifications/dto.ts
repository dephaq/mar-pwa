export interface NotifyDto {
  segment?: Record<string, unknown>;
  title: string;
  body: string;
  url?: string;
  ttl?: number;
}

export interface CampaignMessageDto {
  title: string;
  body: string;
  url?: string;
}

export interface CampaignCreateDto {
  name: string;
  studyId?: string;
  segment?: Record<string, unknown>;
  throttlePerMinute?: number;
  message: CampaignMessageDto;
}

export type CampaignDto = CampaignCreateDto & {
  id: string;
  createdAt: string;
  status: 'draft' | 'launched' | 'stopped';
};

export interface NotificationEventDto {
  id: string;
  campaignId: string;
  subscriptionId?: string;
  status: 'sent' | 'failed';
  error?: string;
  createdAt: string;
}
