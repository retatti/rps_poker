# https://nodejs.org/ja/docs/guides/nodejs-docker-webapp/
FROM node:14.15.0-alpine

WORKDIR /app

RUN npm install -g ionic cordova

COPY ./start.sh /scripts/start.sh

#shフォルダの権限追加（全員実行可）
RUN chmod +x /scripts/*

ENTRYPOINT [ "/scripts/start.sh" ]