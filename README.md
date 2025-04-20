This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- ==================== -->

Шаг 2: Установка и настройка базы данных с использованием Docker и Prisma
Введение
Этот документ описывает второй шаг в создании тренировочного проекта — платформы для управления локальными событиями с геолокацией и аналитикой, использующей Next.js, Prisma, PostgreSQL и AWS Lambda. Цель шага — настроить локальную базу данных PostgreSQL с расширением PostGIS для работы с геоданными, установить Prisma как ORM и подготовить структуру базы данных для пользователей, событий и регистраций. Этот шаг создаёт основу для дальнейшей интеграции с Next.js и AWS Lambda.
Цели шага

Установить Docker для запуска PostgreSQL с PostGIS.
Настроить локальную базу данных events_platform.
Установить и инициализировать Prisma в проекте Next.js.
Определить схему базы данных с моделями для пользователей, событий и регистраций.
Проверить подключение к базе данных через Prisma.

Предварительные требования
Перед началом убедитесь, что у вас есть:

Node.js и npm: Установлены (проверено в шаге 1).
Проект Next.js: Создан в директории my-events-platform (шаг 1).
Терминал: Доступен (Command Prompt, PowerShell на Windows; Terminal на macOS/Linux).
Интернет-соединение: Для загрузки Docker-образа и зависимостей Prisma.

Пошаговые действия

1. Установка Docker (если ещё не установлен)
   Docker позволяет запускать PostgreSQL с PostGIS в изолированном контейнере, упрощая настройку. Если Docker уже установлен, пропустите этот шаг.

Windows:

Перейдите на официальный сайт Docker.
Скачайте Docker Desktop для Windows.
Запустите установщик и следуйте инструкциям, включая активацию WSL 2 (Windows Subsystem for Linux), если требуется.
После установки запустите Docker Desktop и убедитесь, что он работает (иконка в системном трее должна быть зелёной).

macOS:

Скачайте Docker Desktop с официального сайта.
Откройте установочный файл .dmg, перетащите Docker в папку Applications и запустите.
Убедитесь, что Docker Desktop работает (иконка в меню должна быть активной).

Linux (Ubuntu):

Откройте терминал и выполните:
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker

Добавьте вашего пользователя в группу Docker для работы без sudo:
sudo usermod -aG docker $USER
newgrp docker

Проверка установки:

В терминале выполните:
docker --version

Ожидаемый вывод, например: Docker version 20.10.17, build 100c701.

Если команда не работает, проверьте инструкции на сайте Docker или переустановите.

2. Запуск контейнера PostgreSQL с PostGIS
   Мы используем официальный Docker-образ postgis/postgis, который включает PostgreSQL и PostGIS для работы с геоданными. Этот образ поддерживает последние версии PostgreSQL (например, 16 или 17) и PostGIS (например, 3.5), что подходит для нашего проекта.

Перейдите в директорию проекта (если ещё не там):
cd ~/path/to/my-events-platform

Запустите контейнер:

В терминале выполните:
docker run --name postgis-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgis/postgis

Разъяснение параметров:

--name postgis-db: Имя контейнера для удобства.
-e POSTGRES_PASSWORD=mysecretpassword: Устанавливает пароль для пользователя postgres. Замените mysecretpassword на более безопасный пароль, если хотите.
-p 5432:5432: Отображает порт 5432 контейнера (стандартный для PostgreSQL) на порт 5432 вашей машины.
-d: Запускает контейнер в фоновом режиме.
postgis/postgis: Имя Docker-образа, автоматически загружаемого из Docker Hub.

Проверка запуска:

Выполните:
docker ps

Вы должны увидеть контейнер с именем postgis-db в списке, например:
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
abc123def456 postgis/postgis "docker-entrypoint.s…" 2 minutes ago Up 2 minutes 0.0.0.0:5432->5432/tcp postgis-db

Если контейнер не отображается, проверьте логи ошибок:
docker logs postgis-db

Если порт 5432 занят, измените порт, например, на -p 5433:5432, и обновите настройки подключения соответственно.

3. Подключение к базе данных и создание новой базы
   Теперь подключитесь к базе данных, чтобы создать базу events_platform для проекта. Вы можете использовать psql (CLI-клиент PostgreSQL) или графический интерфейс, такой как pgAdmin.

Установка psql (если ещё не установлен):

Windows: Установите PostgreSQL локально с официального сайта, чтобы получить psql, или используйте pgAdmin.

macOS:
brew install postgresql

Linux (Ubuntu):
sudo apt-get install postgresql-client

Подключение через psql:

В терминале выполните:
psql -h localhost -p 5432 -U postgres -d postgres

Параметры:

-h localhost: Хост базы данных.
-p 5432: Порт, указанный при запуске контейнера.
-U postgres: Имя пользователя по умолчанию.
-d postgres: Имя базы данных по умолчанию.

При запросе пароля введите mysecretpassword (или ваш пароль).

Если подключение успешно, вы увидите приглашение postgres=#.

Создание базы данных:

В psql выполните:
CREATE DATABASE events_platform;

Это создаёт новую базу данных для вашего проекта.

Проверьте, что база создана:
\l

Вы должны увидеть events_platform в списке баз данных.

Выход из psql:

Введите:
\q

Альтернатива: Использование pgAdmin:

Скачайте и установите pgAdmin.
Запустите pgAdmin и добавьте новый сервер:
Host: localhost
Port: 5432
Username: postgres
Password: mysecretpassword
Database: postgres

В интерфейсе pgAdmin создайте базу данных events_platform через меню: Object Explorer -> Databases -> Create -> Database.

4. Установка Prisma в проекте
   Prisma — это ORM, который упрощает взаимодействие с PostgreSQL, обеспечивая типобезопасные запросы. Установите и настройте Prisma в вашем проекте Next.js.

Перейдите в директорию проекта (если ещё не там):
cd ~/path/to/my-events-platform

Установите Prisma:

Выполните:
npm install prisma

Это добавляет Prisma как зависимость в ваш проект.

Инициализируйте Prisma:

Выполните:
npx prisma init

Эта команда:

Создаёт папку prisma в корне проекта.
Создаёт файл prisma/schema.prisma с базовой конфигурацией.
Добавляет .env (или использует .env.local) с переменной DATABASE_URL.

5. Настройка Prisma
   Теперь настройте Prisma для подключения к базе данных и определите схему данных.

Настройка переменной окружения:

Откройте файл .env.local в корне проекта (если он не существует, создайте его).

Добавьте:
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/events_platform?schema=public"

Разъяснение:

postgresql://: Протокол для PostgreSQL.
postgres: Имя пользователя.
mysecretpassword: Пароль, установленный для контейнера.
localhost:5432: Хост и порт базы данных.
events_platform: Имя созданной базы данных.
schema=public: Схема PostgreSQL по умолчанию.

Определение схемы Prisma:

Откройте файл prisma/schema.prisma в текстовом редакторе (например, VS Code).

Замените его содержимое на:
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model User {
id Int @id @default(autoincrement())
name String
email String @unique
events Event[] @relation("organizer")
registrations EventRegistration[]
}

model Event {
id Int @id @default(autoincrement())
title String
description String?
location Point @db.Geometry("POINT")
date DateTime
organizerId Int
organizer User @relation("organizer", fields: [organizerId], references: [id])
registrations EventRegistration[]
}

model EventRegistration {
id Int @id @default(autoincrement())
userId Int
eventId Int
user User @relation(fields: [userId], references: [id])
event Event @relation(fields: [eventId], references: [id])
}

Разъяснение схемы:

generator client: Конфигурация для генерации клиента Prisma.
datasource db: Указывает, что используется PostgreSQL, с URL из переменной окружения.
model User: Модель для пользователей с полями id, name, email.
model Event: Модель для событий с полями id, title, description, location (геоданные), date, organizerId (связь с пользователем).
model EventRegistration: Модель для регистраций, связывающая пользователей и события.
location Point @db.Geometry("POINT"): Поле для хранения геоточки (широта, долгота), поддерживаемое PostGIS.

Примечание о PostGIS:

Поле location использует тип Point с директивой @db.Geometry("POINT"), что требует установленного PostGIS в базе данных. Образ postgis/postgis уже включает PostGIS, поэтому дополнительных действий не требуется.

6. Генерация клиента Prisma
   Клиент Prisma — это сгенерированный код, который позволяет выполнять запросы к базе данных из JavaScript/TypeScript.

Сгенерируйте клиент:

Выполните:
npx prisma generate

Эта команда создаёт клиент Prisma в node_modules/.prisma/client, который вы будете использовать в коде Next.js.

Проверка генерации:

Убедитесь, что папка node_modules/.prisma/client содержит файлы, такие как index.js и index.d.ts. Если папка отсутствует, проверьте, нет ли ошибок в schema.prisma (например, синтаксических).

7. Тестирование подключения к базе данных
   Чтобы убедиться, что Prisma корректно подключается к базе данных, создайте тестовый скрипт.

Создайте тестовый файл:

В корне проекта создайте файл test-db.ts (или test-db.js, если не используете TypeScript).

Добавьте следующий код:
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
const allUsers = await prisma.user.findMany()
console.log(allUsers)
}

main()
.catch((e) => {
console.error(e)
process.exit(1)
})
.finally(async () => {
await prisma.$disconnect()
})

Запустите тестовый скрипт:

Выполните:
npx ts-node test-db.ts

Если вы не используете TypeScript, выполните:
node test-db.js

Если ts-node не установлен, установите его:
npm install -D ts-node

Ожидаемый результат:

Вы должны увидеть пустой массив [], так как таблица users пока пуста.
Если возникает ошибка, проверьте:
Запущен ли контейнер Docker (docker ps).
Корректность DATABASE_URL в .env.local.
Правильность пароля и имени базы данных.

8. (Опционально) Создание таблиц в базе данных
   Чтобы Prisma автоматически создала таблицы в базе данных на основе вашей схемы, выполните миграцию:

Создайте миграцию:

Выполните:
npx prisma migrate dev --name init

Это создаёт таблицы User, Event и EventRegistration в базе events_platform и применяет миграцию.

Параметр --name init задаёт имя миграции (например, init для начальной).

Проверка таблиц:

Подключитесь к базе данных через psql:
psql -h localhost -p 5432 -U postgres -d events_platform

Выполните:
\dt

Вы должны увидеть таблицы, такие как User, Event, EventRegistration.

Возможные проблемы и их решения

Проблема
Решение

Docker не запускается
Убедитесь, что Docker Desktop работает (зелёная иконка). Перезапустите Docker или проверьте системные требования на сайте Docker.

Ошибка port is already allocated
Порт 5432 занят. Измените порт в команде docker run, например, -p 5433:5432, и обновите DATABASE_URL.

Ошибка подключения в psql
Проверьте, что контейнер запущен (docker ps). Убедитесь, что пароль и порт верны.

Ошибка при prisma generate
Проверьте синтаксис в schema.prisma. Убедитесь, что DATABASE_URL указан в .env.local.

Ошибка при запуске test-db.ts
Убедитесь, что ts-node установлен (npm install -D ts-node). Проверьте, что контейнер работает, и DATABASE_URL корректен.

Что вы достигли

Установили Docker и запустили контейнер с PostgreSQL и PostGIS.
Создали базу данных events_platform для хранения данных проекта.
Установили и настроили Prisma, определив схему с моделями User, Event и EventRegistration.
Сгенерировали клиент Prisma для взаимодействия с базой данных.
Протестировали подключение к базе данных, убедившись, что Prisma работает корректно.
(Опционально) Применили миграцию для создания таблиц в базе данных.

Следующий шаг (не выполняйте пока)
Следующим шагом будет интеграция Prisma с вашим приложением Next.js. Вы создадите API-роуты для операций, таких как создание событий, регистрация пользователей и получение данных для отображения на фронтенде. Также начнёте настройку интерфейса с картой для отображения событий.
Примечания

Сохраните пароль базы данных (mysecretpassword) в безопасном месте. Для production используйте более сложный пароль.
Если вы планируете использовать AWS RDS в будущем, настройка будет аналогична, но с использованием endpoint RDS и включением PostGIS.
Для удобства работы с базой данных установите pgAdmin или используйте DBeaver как альтернативу psql.

Заключение
Вы успешно настроили локальную базу данных PostgreSQL с PostGIS и интегрировали Prisma в ваш проект Next.js. Это создаёт прочную основу для работы с геоданными и аналитикой в платформе управления локальными событиями. Когда будете готовы, дайте знать, чтобы перейти к следующему шагу!
