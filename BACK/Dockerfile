FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

ENTRYPOINT [ "yarn", "start" ]