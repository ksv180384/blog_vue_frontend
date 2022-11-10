FROM node:19

WORKDIR /app_blog

ENV PATH /app_blog/node_modules/.bind:$PATH

COPY package.json /app_blog/package.json

RUN npm install

COPY . ./app_blog

CMD npm run serve