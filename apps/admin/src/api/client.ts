import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];
type StudyDto = components['schemas']['StudyDto'];
type CampaignCreateDto = components['schemas']['CampaignCreateDto'];
type CampaignDto = components['schemas']['CampaignDto'];
type NotificationEventDto = components['schemas']['NotificationEventDto'];

const API = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const jsonHeaders = { 'Content-Type': 'application/json' };
const api = (p: string) => `${API}${p}`;

export async function listStudies(): Promise<StudyDto[]> {
  const res = await fetch(api('/api/studies'));
  if (!res.ok) throw new Error('Failed to list studies');
  return res.json();
}

export async function getStudy(id: string): Promise<StudyDto> {
  const res = await fetch(api(`/api/studies/${id}`));
  if (!res.ok) throw new Error('Failed to get study');
  return res.json();
}

export async function createStudy(data: CreateStudyDto): Promise<StudyDto> {
  const res = await fetch(api('/api/studies'), {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create study');
  return res.json();
}

export async function updateStudy(id: string, data: CreateStudyDto): Promise<StudyDto> {
  const res = await fetch(api(`/api/studies/${id}`), {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update study');
  return res.json();
}

export async function listCampaigns(): Promise<CampaignDto[]> {
  const res = await fetch(api('/api/campaigns'));
  if (!res.ok) throw new Error('Failed to list campaigns');
  return res.json();
}

export async function createCampaign(data: CampaignCreateDto): Promise<CampaignDto> {
  const res = await fetch(api('/api/campaigns'), {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create campaign');
  return res.json();
}

export async function getCampaign(id: string): Promise<CampaignDto> {
  const res = await fetch(api(`/api/campaigns/${id}`));
  if (!res.ok) throw new Error('Failed to get campaign');
  return res.json();
}

export async function launchCampaign(id: string): Promise<{ launched: number }> {
  const res = await fetch(api(`/api/campaigns/${id}`), { method: 'POST' });
  if (!res.ok) throw new Error('Failed to launch campaign');
  return res.json();
}

export async function stopCampaign(id: string): Promise<{ stopped: boolean }> {
  const res = await fetch(api(`/api/campaigns/${id}`), { method: 'PUT' });
  if (!res.ok) throw new Error('Failed to stop campaign');
  return res.json();
}

export async function listCampaignEvents(id: string): Promise<NotificationEventDto[]> {
  const res = await fetch(api(`/api/campaigns/${id}/events`));
  if (!res.ok) throw new Error('Failed to list events');
  return res.json();
}
