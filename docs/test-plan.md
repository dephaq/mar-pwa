# Test Plan

## Platforms
- [ ] iOS (Safari PWA)
- [ ] Android (Chrome)
- [ ] Desktop (Chrome/Edge)

## Push Notifications
### Subscription
- [ ] Request notification permission
- [ ] Register Service Worker and subscribe
- [ ] Persist subscription server-side

### Open from Push
- [ ] Receive push in foreground and background
- [ ] Clicking notification opens target deep link

## Campaigns
- [ ] Create campaign with content and segment
- [ ] Launch campaign
- [ ] Delivery events appear in dashboard

## CSV Export
- [ ] Export campaign results to CSV
- [ ] File has expected columns and data

## Offline Mode
- [ ] App shell loads without network
- [ ] Queued actions sync after reconnect

## Lighthouse
- [ ] Performance ≥ 90
- [ ] PWA ≥ 90
- [ ] Best Practices ≥ 90
- [ ] Accessibility ≥ 90
