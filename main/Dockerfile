# https://nodejs.org/ja/docs/guides/nodejs-docker-webapp/
FROM node:14.15.0-alpine

COPY ./webapp /app
WORKDIR /app

RUN npm install -g ionic cordova

# Expose is NOT supported by Heroku
# EXPOSE 5000 	

COPY ./start.sh /scripts/start.sh

#shフォルダの権限追加（全員実行可）
RUN chmod +x /scripts/*

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

CMD [ "/scripts/start.sh" ]