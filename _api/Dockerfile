FROM node:10.10.0

RUN mkdir -p /cinema-microservice
WORKDIR /cinema-microservice

COPY app.js /cinema-microservice/app.js
COPY server.js /cinema-microservice/server.js
COPY controllers /cinema-microservice/controllers
COPY db /cinema-microservice/db
COPY routes /cinema-microservice/routes
COPY utils /cinema-microservice/utils
COPY package.json /cinema-microservice/package.json
COPY package-lock.json /cinema-microservice/package-lock.json

RUN npm install

CMD [ "npm", "run", "build" ]