# CI/CD Workflow

Этот репозиторий использует GitHub Actions для проверки и деплоя.

## Последовательность
1. **lint** – `npm run lint`
2. **typecheck** – `npm run typecheck`
3. **build** – `npm run build`
4. **Lighthouse CI** – проверяет, что PWA, Performance и Best Practices ≥ 90.
5. **deploy-web** – публикация `apps/web/dist` в GitHub Pages.
6. **deploy-api** – триггер деплоя `services/api` в Render и Vercel.

## Секреты окружения
Добавьте в настройках репозитория:
- `LHCI_GITHUB_TOKEN` – токен для Lighthouse CI.
- `RENDER_API_TOKEN`, `RENDER_SERVICE_ID` – доступ к Render Deploy API.
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` – параметры Vercel CLI.

GitHub Pages использует встроенный `GITHUB_TOKEN`.
