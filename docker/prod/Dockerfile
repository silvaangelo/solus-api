FROM node:10-alpine

WORKDIR /src
COPY . /src

RUN set -x \
    && yarn \
    && yarn tsc

FROM node:10-alpine

WORKDIR /prod

COPY --from=0 /src/dist /prod
COPY --from=0 /src/package.json /prod
COPY --from=0 /src/yarn.lock /prod

RUN set -x \
    && yarn install --prod \
    && yarn cache clean

CMD node /prod/server.js