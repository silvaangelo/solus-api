FROM node:8

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN set -x \
    && npm i -g nodemon typescript concurrently ts-node \
    && yarn

CMD npm run dev