# Sofia TMS project by @lorriant

> TMS = ticket management system. Why Sofia? Nice question...

Бэкенд приложение с использованием стека: `Node JS, Typescript, Express, SQdLite, Prisma ORM` с е2е тестами на `Jest + axios`.

### База данных

Создается с помощью Prisma ORM. Есть миграции. Cостоит из одной таблицы Ticket (обращение), в котором есть следующие столбцы:

1. id
2. topic (тема обращения)
3. message (текст обращения)
4. status (0 - новое обращение, 1 - в работе, 2 - завершено, 3 - отменено. Есть кастомный enum тип в файле ticket.types.ts)
5. resolution (текст решения)
6. cancelledReason (причина отмены)
7. createdAt (дата создания, нужен для фильтрации)
8. updatedAt (автоматическая дата обновления)
9. cancelledAt (дата отмены)

Вся БД описана в файле `prisma/schema.prisma`. А сам файл появится в этой папке.

### Эндпоинты:

base url: `http://localhost:3002/api/tickets`

- POST /create (создать обращение, нужно передать тему (`topic`) и текст обращения (`message`))
- PUT /progress (взять обращение в работу, передать `id` обращения)
- PUT /complete (завершить обращение, передать `id` и решение `resolution`)
- PUT /cancel (отмена обращения, передать `id` и причину `cancelledReason`)
- PUT /cancel-all (отмена всех обращений которые в работе, передать `id` и причину `cancelledReason`)
- GET / (получить все обращения с фильтром по диапазону дат, передать дату начала `fromDate`, дату окончания `toDate` в формате `2025-05-22`)

### Quick start

- создать файл в корне `.env` похожий на `example.env` и заменить `YOUR_DATABASE_NAME` на название вашего БД, который хотите создать
- установить все пакеты `npm install`
- создать файл SQLite базы данных и инициировать `npx prisma migrate dev`
- запустить сервер в режиме разработки `npm run dev`, будет доступен по адресу [http://localhost:3002/api/tickets/](http://localhost:3002/api/tickets/)
- сделать сборку и запустить сервер в режиме продакшн `npm run build && npm run prod` , будет доступен по адресу [http://localhost:3002/api/tickets/](http://localhost:3002/api/tickets/)
- запустить все е2е тесты чтобы проверить все эндпоинты (сервер должен быть запущен) `npm run test` (Осторожно! Не запускайте на проде)

### Format and lint code

`npm run format && npm run lint`

# TODO:
- add nginx server for proxy front and back
