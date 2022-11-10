## Блог (frontend)

#### Node.js, npm, Vue 3

login: `test@test.ru`  
password: `password`

[Demo](https://site5.ksv-test.ru/).

#### [Блог Backend](https://github.com/ksv180384/blog_vue_backend)

### Порядок установки

---

#### Если вы используете Docker

- После клонирования репозитория, создайте в корне файл `.env` и добавьте в него параметр `VUE_APP_API_URL=http://blog_vue_nginx:8083`
- Выполнить команду `docker compose up`
- frontend будет доступен по адресу `http://localhost:8081`
- Для нормальной работы backend должен быть запущен через docker

---

#### Если вы НЕ используете Docker

- После клонирования репозитория, создайте в корне файл `.env` и добавьте в него параметр `VUE_APP_API_URL=http://blog-vue.local`
- Выполнить команды: 
  - `npm install`
  - `npm run serve`
- frontend будет доступен по адресу `http://localhost:3011`
- Для нормального доступа к api, backend должен быть запущен без использования docker
