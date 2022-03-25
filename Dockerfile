FROM node:14-alpine as ts-compiler

WORKDIR /build

COPY .es* ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY rollup.config.js ./

COPY src ./src

RUN npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=ts-compiler /build/eb-cmp.js /usr/share/nginx/html

COPY include.html /usr/share/nginx/html

COPY default.conf.template /etc/nginx/templates/default.conf.template