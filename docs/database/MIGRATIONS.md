---
title: Estratégia de Migrations
version: 1.0.0
last_updated: 2025-11-26
author: Oryum Tech
classification: CONFIDENCIAL - USO INTERNO
---

# Estratégia de Migrations

## Visão Geral

> **Nota**: O MVP atual usa Session Storage sem migrations. Esta documentação descreve a estratégia para o banco de dados PostgreSQL em produção.

## Ferramenta: Prisma Migrate

### Instalação

```bash
npm install prisma @prisma/client
npx prisma init
```

### Estrutura de Arquivos

```
prisma/
├── schema.prisma          # Schema do banco
├── migrations/
│   ├── 20250101000000_init/
│   │   └── migration.sql
│   ├── 20250115000000_add_challenges/
│   │   └── migration.sql
│   └── migration_lock.toml
└── seed.ts               # Dados iniciais
```

## Comandos

```bash
# Criar nova migration
npx prisma migrate dev --name add_feature

# Aplicar migrations em produção
npx prisma migrate deploy

# Resetar banco (desenvolvimento)
npx prisma migrate reset

# Ver status das migrations
npx prisma migrate status
```

## Convenções de Nomenclatura

```
YYYYMMDDHHMMSS_descricao_da_mudanca

Exemplos:
20250101000000_init
20250115120000_add_challenges_table
20250201093000_add_poi_category_column
20250215140000_rename_user_avatar_field
```

## Exemplo de Migration

### Schema Prisma

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      UserRole @default(tourist)
  points    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  visits      Visit[]
  badges      UserBadge[]
  photos      Photo[]
}

model POI {
  id          String  @id @default(uuid())
  name        String
  description String
  points      Int     @default(20)
  lat         Float
  lng         Float
  active      Boolean @default(true)

  visits Visit[]
}
```

### SQL Gerado

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'tourist',
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

## Boas Práticas

### 1. Migrations Sempre Forward

```sql
-- ✅ Correto: Adiciona coluna nullable
ALTER TABLE "POI" ADD COLUMN "category" VARCHAR(100);

-- ❌ Evitar: Altera tipo de coluna existente
ALTER TABLE "POI" ALTER COLUMN "points" TYPE BIGINT;
```

### 2. Migrations Reversíveis

Sempre considerar como desfazer:

```sql
-- Migration UP
ALTER TABLE "User" ADD COLUMN "phone" VARCHAR(20);

-- Migration DOWN (em caso de rollback manual)
ALTER TABLE "User" DROP COLUMN "phone";
```

### 3. Dados de Produção

```sql
-- Antes de remover coluna, garantir backup
CREATE TABLE "User_backup" AS SELECT * FROM "User";

-- Ou migrar dados
UPDATE "User" SET "new_column" = "old_column";
```

## Rollback

### Em Desenvolvimento

```bash
# Volta para migration anterior
npx prisma migrate reset
```

### Em Produção

⚠️ Rollbacks em produção são manuais e requerem cuidado:

1. Fazer backup do banco
2. Aplicar SQL de rollback manualmente
3. Atualizar tabela `_prisma_migrations`
4. Testar aplicação

---

```
© 2025 Oryum Tech. Todos os direitos reservados.
```
