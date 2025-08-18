# LOCAL SETUP — MAR PWA

Этот гайд описывает локальный запуск монорепозитория MAR PWA (PWA для респондентов, админка для операторов, API) и проверку зависимостей.

- Репозиторий: корень — workspaces `apps/*`, `services/*`, `packages/*`.
- Технологии: React + Vite (web/admin), NestJS (API), TypeScript, vite-plugin-pwa, OpenAPI типы.

## 1) Предустановка и проверка зависимостей

- Требования к системе:
  - Node.js ≥ 20.x
  - npm ≥ 9.x
  - Git

Проверьте версии:
```bash
node -v
npm -v
git --version
```
Если Node < 20:
- Рекомендуется установить `nvm` и поставить LTS: `nvm install --lts && nvm use --lts`.

Дополнительно (для Web Push):
- Убедитесь, что браузер разрешает уведомления для `http://localhost`.

## 2) Установка зависимостей монорепозитория

Из корня проекта:
```bash
npm install
```
Сгенерируйте типы из OpenAPI (в пакет `@mar/shared`):
```bash
npm run gen:api-types
```

## 3) Переменные окружения (.env)

Создайте файлы `.env` в следующих пакетах.

1) `services/api/.env` (Web Push VAPID):
```bash
VAPID_SUBJECT=mailto:you@example.com
VAPID_PUBLIC_KEY=<Ваш VAPID public key>
VAPID_PRIVATE_KEY=<Ваш VAPID private key>
PORT=3000
```
Сгенерировать ключи (разово):
```bash
npx web-push generate-vapid-keys
# Вывод вставьте как VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY
```

2) `apps/web/.env` (PWA):
```bash
VITE_API_URL=http://localhost:3000
VITE_VAPID_PUBLIC_KEY=<тот же public key, что и выше>
```

3) `apps/admin/.env` (Админка):
```bash
VITE_API_URL=http://localhost:3000
```

Примечания:
- Веб и админка читают `VITE_API_URL` из `.env`.
- PWA читает `VITE_VAPID_PUBLIC_KEY` для `PushManager.subscribe()` в `apps/web/src/pages/Profile.tsx`.

## 4) Запуск сервисов (dev)

Откройте 3 терминала или используйте параллельный запуск.

1) API (NestJS):
```bash
npm run start:dev -w @mar/api
# Поднимется на http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

2) Web (PWA):
```bash
npm run dev -w mar-web
# Обычно http://localhost:5173
```

3) Admin (панель оператора):
```bash
npm run dev -w mar-admin
# Обычно http://localhost:5174 (Vite выберет следующий свободный порт)
```

### Важно про CORS в dev
Фронтенды (5173/5174) обращаются к API (3000) с другого origin. Если увидите ошибки CORS:
- Быстрое решение: включить CORS в API, добавив в `services/api/src/main.ts` строку `app.enableCors();` перед `app.listen(...)`.
- Альтернатива: настроить dev-прокси в Vite (не настроено по умолчанию).

## 5) Проверка функциональности

1) Проверка API живости:
```bash
open http://localhost:3000/api/docs
```
Должна открыться Swagger-страница.

2) Проверка PWA и профиля:
- Откройте `http://localhost:5173/#/home`.
- Перейдите в `Профиль`.
- Включите уведомления кнопкой «Включить уведомления» (вызовет `Notification.requestPermission` и `PushManager.subscribe`).
- Должен уйти `POST /api/subscriptions` на API.

3) Тестовое Web Push уведомление:
Отправьте запрос на немедленную отправку (`/api/notify`). Пример:
```bash
curl -X POST http://localhost:3000/api/notify \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "MAR Test",
    "body": "Hello from local API",
    "url": "http://localhost:5173/#/studies"
  }'
```
Ожидаем: всплывшее уведомление, по клику откроется указанный URL (обрабатывается в `apps/web/src/sw.ts`).

4) Админка — исследования и кампании:
- Откройте `http://localhost:5174/admin#/campaigns` и `#/studies`.
- Действия форм обращаются к API по `VITE_API_URL`.

## 6) Продвинутые сценарии

- PWA Service Worker корректнее тестировать на сборке:
```bash
npm run build -w mar-web
npm run preview -w mar-web
# Откроется http://localhost:4173 (по умолчанию)
```
- После изменения `services/api/openapi.yaml` перегенерируйте типы:
```bash
npm run gen:api-types
```

## 7) Частые проблемы и решения

- CORS ошибка при запросах с 5173/5174 к 3000:
  - Включите CORS: в `services/api/src/main.ts` добавьте `app.enableCors();`.
- `Failed to register a ServiceWorker`:
  - Используйте `localhost` или `vite preview`; проверьте, что SW файл `sw.ts` собирается плагином PWA.
- `Notification.permission` не `granted`:
  - Разрешите уведомления в настройках браузера для `http://localhost:5173`.
- 401/403 (на будущее):
  - Для защищённых эндпоинтов потребуется добавить аутентификацию (в текущем каркасе не настроена).

## 8) Структура и ключевые файлы

- PWA маршруты: `apps/web/src/router.tsx`
- PWA SW (push/notificationclick): `apps/web/src/sw.ts`
- Профиль и подписка на пуши: `apps/web/src/pages/Profile.tsx`
- Админка маршруты: `apps/admin/src/router.tsx`
- Админка API-клиент: `apps/admin/src/api/client.ts`
- API bootstrap/Swagger: `services/api/src/main.ts`
- Web Push сервис (VAPID): `services/api/src/notifications/webpush.service.ts`
- OpenAPI контракт: `services/api/openapi.yaml`
- Генерация типов: `packages/shared/package.json` → скрипт `generate`

## 9) Полезные команды (из корня)

```bash
# Установка зависимостей
npm install

# Генерация типов из OpenAPI
npm run gen:api-types

# Запуск API (dev)
npm run start:dev -w @mar/api

# Запуск PWA (web)
npm run dev -w mar-web

# Запуск Admin
npm run dev -w mar-admin

# Сборка и предпросмотр PWA
npm run build -w mar-web && npm run preview -w mar-web
```

## 10) Чек-лист перед запуском

- [ ] Node ≥ 20.x, npm ≥ 9.x
- [ ] `npm install` выполнен без ошибок
- [ ] Сгенерированы VAPID ключи и заполнены `.env`
- [ ] API доступен по `http://localhost:3000/api/docs`
- [ ] Веб и админка читают `VITE_API_URL`
- [ ] (При необходимости) включён CORS в API
- [ ] В браузере разрешены уведомления для `localhost`
