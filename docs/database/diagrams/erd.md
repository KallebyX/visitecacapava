---
title: Diagrama Entidade-Relacionamento
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Diagrama Entidade-Relacionamento

## Visão Geral

```mermaid
erDiagram
    %% ENTIDADES PRINCIPAIS

    USER {
        uuid id PK
        varchar email UK
        varchar name
        varchar password_hash
        enum role
        varchar avatar_url
        text bio
        varchar phone
        int points
        boolean verified
        timestamp created_at
        timestamp updated_at
    }

    POI {
        uuid id PK
        varchar name
        text description
        text long_description
        varchar image_url
        varchar website
        int points
        geography location
        boolean active
        timestamp created_at
    }

    ROUTE {
        uuid id PK
        varchar name
        text description
        varchar image_url
        decimal distance_km
        int estimated_time_min
        enum difficulty
        varchar category
        timestamp created_at
    }

    BADGE {
        varchar id PK
        varchar name
        text description
        varchar icon
        varchar criteria_type
        jsonb criteria_data
    }

    VISIT {
        uuid id PK
        uuid user_id FK
        uuid poi_id FK
        int points_earned
        timestamp visited_at
    }

    HOTEL {
        uuid id PK
        uuid user_id FK
        varchar name
        text address
        varchar phone
    }

    HOTEL_CHECKIN {
        uuid id PK
        uuid hotel_id FK
        varchar tourist_name
        varchar phone
        varchar profession
        varchar nationality
        date birth_date
        enum gender
        varchar id_document
        varchar origin_city
        enum travel_reason
        enum transport_mean
        enum discovery_channel
        enum poi_opinion
        enum city_opinion
        date check_in_date
        date check_out_date
        timestamp created_at
    }

    PHOTO {
        uuid id PK
        uuid user_id FK
        uuid poi_id FK
        varchar image_url
        text caption
        varchar location
        text[] tags
        timestamp created_at
    }

    REVIEW {
        uuid id PK
        uuid user_id FK
        enum entity_type
        uuid entity_id
        int rating
        text comment
        int helpful
        int not_helpful
        text response
        boolean verified
        timestamp created_at
    }

    FAVORITE {
        uuid id PK
        uuid user_id FK
        enum entity_type
        uuid entity_id
        timestamp added_at
    }

    CHALLENGE {
        uuid id PK
        varchar name
        text description
        date start_date
        date end_date
        enum type
        int target
        int reward
    }

    %% TABELAS DE JUNÇÃO

    USER_BADGE {
        uuid user_id FK
        varchar badge_id FK
        timestamp earned_at
    }

    ROUTE_POI {
        uuid route_id FK
        uuid poi_id FK
        int sequence
    }

    ROUTE_PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid route_id FK
        enum status
        timestamp completed_at
    }

    PHOTO_LIKE {
        uuid photo_id FK
        uuid user_id FK
        timestamp liked_at
    }

    CHALLENGE_PARTICIPANT {
        uuid challenge_id FK
        uuid user_id FK
        int progress
        boolean completed
        timestamp joined_at
    }

    USER_FOLLOWER {
        uuid follower_id FK
        uuid following_id FK
        timestamp followed_at
    }

    %% RELACIONAMENTOS

    USER ||--o{ VISIT : "makes"
    USER ||--o{ USER_BADGE : "earns"
    USER ||--o{ PHOTO : "uploads"
    USER ||--o{ REVIEW : "writes"
    USER ||--o{ FAVORITE : "saves"
    USER ||--o{ ROUTE_PROGRESS : "tracks"
    USER ||--|| HOTEL : "owns"
    USER ||--o{ PHOTO_LIKE : "gives"
    USER ||--o{ CHALLENGE_PARTICIPANT : "joins"
    USER ||--o{ USER_FOLLOWER : "follows"

    POI ||--o{ VISIT : "receives"
    POI ||--o{ ROUTE_POI : "belongs_to"
    POI ||--o{ PHOTO : "tagged_in"
    POI ||--o{ REVIEW : "has"

    ROUTE ||--o{ ROUTE_POI : "contains"
    ROUTE ||--o{ ROUTE_PROGRESS : "tracked_by"

    BADGE ||--o{ USER_BADGE : "awarded_as"

    HOTEL ||--o{ HOTEL_CHECKIN : "registers"

    PHOTO ||--o{ PHOTO_LIKE : "receives"

    CHALLENGE ||--o{ CHALLENGE_PARTICIPANT : "has"
```

## Legenda

### Tipos de Dados

| Tipo | Descrição |
|------|-----------|
| `uuid` | Identificador único universal |
| `varchar` | Texto de tamanho variável |
| `text` | Texto longo |
| `int` | Número inteiro |
| `decimal` | Número decimal |
| `boolean` | Verdadeiro/Falso |
| `date` | Data sem hora |
| `timestamp` | Data e hora com timezone |
| `enum` | Valor de conjunto predefinido |
| `jsonb` | JSON binário |
| `geography` | Tipo geográfico (PostGIS) |
| `text[]` | Array de texto |

### Cardinalidades

| Símbolo | Significado |
|---------|-------------|
| `\|\|--o{` | Um para muitos |
| `\|\|--\|\|` | Um para um |
| `}o--o{` | Muitos para muitos |

### Constraints

| Abreviação | Significado |
|------------|-------------|
| `PK` | Primary Key |
| `FK` | Foreign Key |
| `UK` | Unique Key |

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
