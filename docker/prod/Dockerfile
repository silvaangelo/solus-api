FROM node:8

WORKDIR /src
COPY . /src

RUN set -x \
    && npm install -g nodemon typescript concurrently ts-node yarn \
    && yarn \
    && yarn prod

CMD node /src/dist/server.js