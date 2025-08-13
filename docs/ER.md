# ER Diagram

```mermaid
erDiagram
    USERS ||--o{ PROFILES : has
    USERS ||--o{ CONSENTS : gives
    USERS ||--o{ PRESCREENER_ANSWERS : answers
    USERS ||--o{ DEVICE_SUBSCRIPTIONS : owns
    USERS ||--o{ AUDIT_EVENTS : triggers
    USERS ||--o{ INVITATIONS : receives
    USERS ||--o{ PARTICIPATIONS : participates
    USERS ||--o{ REWARDS : earns
    STUDIES ||--o{ INVITATIONS : includes
    STUDIES ||--o{ PARTICIPATIONS : includes
    STUDIES ||--o{ REWARDS : awards
    INVITATIONS ||--o{ PARTICIPATIONS : leads_to
```
