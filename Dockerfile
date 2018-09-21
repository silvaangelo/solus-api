FROM node:8.11

WORKDIR /app

RUN npm install yarn typescript -g

COPY . /app

RUN yarn install

CMD npm run start-dev-restart