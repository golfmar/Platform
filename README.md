запускать докер
npm run dev
npx ts-node src/test-prisma.ts

<!-- ==================== -->

Алгоритм
Установка Docker и PostGIS:
Установлен Docker Desktop.
Запущен контейнер postgis-db (PostGIS):
Имя базы: events_platform
Пользователь: postgres
Пароль: golfstrimmar1966
Порт: 5432
Создание проекта Next.js:
Команда:
bash

Копировать
npx create-next-app@latest platform
Настройки: TypeScript, ES Modules, App Router.
Добавление зависимостей:
Установлены зависимости в package.json:
json

Копировать
"dependencies": {
"@prisma/client": "^6.6.0",
"next": "15.3.1",
"react": "^19.0.0",
"react-dom": "^19.0.0"
},
"devDependencies": {
"prisma": "^6.6.0",
"ts-node": "^10.9.2",
"typescript": "^5",
"@types/node": "^20",
"@types/react": "^19",
"@types/react-dom": "^19",
"eslint": "^9",
"eslint-config-next": "15.3.1"
}
Команда:
bash

Копировать
npm install @prisma/client prisma ts-node typescript @types/node @types/react @types/react-dom eslint eslint-config-next
Инициализация Prisma:
Команда:
bash

Копировать
npx prisma init
Создан prisma/schema.prisma и .env.
Настройка .env:
В D:\WEB\Platform\.env добавлено:
text

Копировать
DATABASE_URL="postgresql://postgres:golfstrimmar1966@localhost:5432/events_platform?schema=public"
Создание таблиц в базе:
В pgAdmin вручную созданы таблицы: events, users, registrations, spatial_ref_sys.
Проверено в pgAdmin:
Сервер: localhost:5432, база events_platform, пользователь postgres, пароль golfstrimmar1966.
Настройка schema.prisma:
В D:\WEB\Platform\prisma\schema.prisma добавлены модели:
prisma

Копировать
generator client {
provider = "prisma-client-js"
output = "../src/generated/prisma"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model events {
id Int @id @default(autoincrement())
title String @db.VarChar(255)
description String?
event_date DateTime @db.Timestamp(6)
location Unsupported("geometry")
created_at DateTime? @default(now()) @db.Timestamp(6)
organizer_id Int
users users @relation(fields: [organizer_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
registrations registrations[]

@@index([location], type: Gist)
}

model registrations {
id Int @id @default(autoincrement())
user_id Int
event_id Int
registered_at DateTime? @default(now()) @db.Timestamp(6)
events events @relation(fields: [event_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
users users @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

@@unique([user_id, event_id])
}

model spatial_ref_sys {
srid Int @id
auth_name String? @db.VarChar(256)
auth_srid Int?
srtext String? @db.VarChar(2048)
proj4text String? @db.VarChar(2048)
}

model users {
id Int @id @default(autoincrement())
username String @unique @db.VarChar(50)
email String @unique @db.VarChar(255)
password_hash String @db.VarChar(255)
created_at DateTime? @default(now()) @db.Timestamp(6)
events events[]
registrations registrations[]
}
Генерация Prisma-клиента:
Команда:
bash

Копировать
npx prisma generate
Создана папка D:\WEB\Platform\src\generated\prisma.
Создание тестового скрипта:
Создан D:\WEB\Platform\src\test-prisma.ts:
javascript

Копировать
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function testConnection() {
try {
const events = await prisma.events.findMany({
select: {
id: true,
title: true,
event_date: true,
},
});
console.log("Events:", events);
} catch (error) {
console.error("Error:", error);
} finally {
await prisma.$disconnect();
}
}

testConnection();
Настройка TypeScript:
В D:\WEB\Platform\tsconfig.json:
json

Копировать
{
"compilerOptions": {
"target": "ES2017",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"strict": true,
"noEmit": false,
"outDir": "./dist",
"esModuleInterop": true,
"module": "esnext",
"moduleResolution": "bundler",
"resolveJsonModule": true,
"isolatedModules": true,
"jsx": "preserve",
"incremental": true,
"plugins": [
{
"name": "next"
}
],
"paths": {
"@/_": ["./src/_"]
}
},
"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "src/test-prisma.ts"],
"exclude": ["node_modules"]
}
Компиляция и запуск тестового скрипта:
Компиляция:
bash

Копировать
npx tsc src/test-prisma.ts
Переименование:
bash

Копировать
move src\test-prisma.js src\test-prisma.cjs
Запуск:
bash

Копировать
node src/test-prisma.cjs
Вывод:
text

Копировать
Events: [
{ id: 1, title: 'Music Festival', event_date: 2025-05-01T19:00:00.000Z },
{ id: 2, title: 'Art Exhibition', event_date: 2025-05-10T10:00:00.000Z }
]
Запуск приложения:
Команда:
bash

Копировать
npm run dev
Открыт браузер: http://localhost:3000.

---

https://grok.com/share/bGVnYWN5_05d51046-d366-46f8-8460-fa6212ce39d5
https://grok.com/chat/a73bf0d5-118c-4c70-9416-5e61bd31dc71
