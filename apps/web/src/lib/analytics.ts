export function trackEvent(event: string, payload: Record<string, unknown>) {
  // TODO: replace console.log with real analytics implementation
  console.log('analytics', event, payload);
}
