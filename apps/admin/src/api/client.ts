import type { components } from '@mar/shared';

type CreateStudyDto = components['schemas']['CreateStudyDto'];
type StudyDto = components['schemas']['StudyDto'];

const jsonHeaders = { 'Content-Type': 'application/json' };

export async function listStudies(): Promise<StudyDto[]> {
  const res = await fetch('/api/studies');
  if (!res.ok) throw new Error('Failed to list studies');
  return res.json();
}

export async function getStudy(id: string): Promise<StudyDto> {
  const res = await fetch(`/api/studies/${id}`);
  if (!res.ok) throw new Error('Failed to get study');
  return res.json();
}

export async function createStudy(data: CreateStudyDto): Promise<StudyDto> {
  const res = await fetch('/api/studies', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create study');
  return res.json();
}

export async function updateStudy(id: string, data: CreateStudyDto): Promise<StudyDto> {
  const res = await fetch(`/api/studies/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update study');
  return res.json();
}
