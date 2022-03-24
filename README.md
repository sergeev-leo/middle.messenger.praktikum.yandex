## Описание

Веб-приложение "чат".

### Используемые технологии
 - Pug (шаблонизатор)
 - Sass (препроцессор CSS)
 - Typescript (статически типизированный JS)
 - Jest (написание тестов)
 - eslint, stylelint (линтеры)
 - Webpack v5 (сборка) 
 - Express (веб-сервер)
 - настроен husky pre-commit hook (запуск линтеров и тестов)
 - Docker
 - контейнер развернут на heroku
 
### Описание реализованной функциональности
 - SPA приложение
 - реализован роутинг приложения (с проверкой данных пользователя)
 - подключение к HTTP/WEBSOCKET API
   - для формы логина/авторизации
   - для страниц редактирования профиля
     - данные пользователя
     - пароль
     - аватар
     - выход из приложения
   - страница чатов
     - получение чатов
     - поиск среди списка чатов
     - получение пользователей чата
     - создание чата
     - удаление чата
     - добавление пользователя в чат
     - удаление пользователя из чата
     - установка аватара чата
     - получение последних сообщений чата
     - обмен сообщениями
 - 

## Установка

- `npm install` — установка необходимых зависимостей,
- `npm run dev` — запуск версии для разработки, используется webpack-dev-server,
- `npm run build` — сборка стабильной версии,
- `npm run start` — сборка стабильной версии и запуск вебсервера на 3000 порту,
- `npm run lint` — запуск линтера для проверки typescript файлов,
- `npm run stylelint` — запуск линтера для проверки scss файлов,
- `npm run test` — запуск тестов,


## Прототипы

[Ссылка на прототипы в Figma](https://www.figma.com/file/8gnkzuXApabC9CMNaVN5E8/Chat-(Copy)?node-id=0%3A1)

## Netlify

[автодеплой из deploy](https://gallant-euclid-0ba5e8.netlify.app/)

## Heroku

[heroku](http://shrouded-earth-28874.herokuapp.com/)

## запуск с Docker

- установите _Docker_
- откройте терминал и перейдите в корневой каталог приложения (где расположен _Dockerfile_)
- соберите образ на основе _Dockerfile_ командой `docker build -t {имя образа} .` 
- запустите контейнер с образом выполнив команду `docker run -p 3000:3000 {имя образа}`
- перейдите по адресу `http://localhost:3000/`

## PR

[Ссылка на ПР четвертого спринта](https://github.com/sergeev-leo/middle.messenger.praktikum.yandex/pull/4)
