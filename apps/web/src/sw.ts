/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: unknown };

import { precacheAndRoute } from 'workbox-precaching';

const withBase = (p = '') => new URL(p, self.registration.scope).toString();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'MAR', {
      body: data.body,
      data: { url: data.url },
      icon: withBase('icon-192x192.png'),
      badge: withBase('icon-192x192.png'),
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url)
    ? new URL(event.notification.data.url, self.registration.scope).toString()
    : self.registration.scope;
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
