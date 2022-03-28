FROM node:14-alpine as ts-compiler

WORKDIR /build

COPY .es* ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY rollup.config.js ./
COPY yarn.lock ./

COPY src ./src

RUN npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=ts-compiler /build/eb-cmp.js /usr/share/nginx/html/cmp/

COPY include.html /usr/share/nginx/html/cmp

COPY default.conf.template /etc/nginx/templates/default.conf.template