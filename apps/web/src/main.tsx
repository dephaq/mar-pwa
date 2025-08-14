import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { registerSW } from 'virtual:pwa-register';
import { router } from './router';


if (!location.hash || location.hash === '#' || location.hash === '#/') {
  location.hash = '#/home';
}
registerSW({ immediate: true });

const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(<RouterProvider router={router} />);
