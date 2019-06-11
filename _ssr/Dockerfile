FROM node:8.11.3

RUN mkdir -p /cinema
RUN mkdir -p /deploy
WORKDIR /cinema

COPY app /cinema/app
COPY config /cinema/config
COPY server /cinema/server
COPY webpack /cinema/webpack
COPY jestsetup.js /cinema/jestsetup.js
COPY jest.config.js /cinema/jest.config.js
COPY package.json /cinema/package.json
COPY package-lock.json /cinema/package-lock.json
COPY app.json /cinema/app.json
COPY nodemon.json /cinema/nodemon.json
COPY debug.js /cinema/debug.js
COPY .babelrc /cinema/.babelrc
COPY .eslintrc /cinema/.eslintrc
COPY .eslintignore /cinema/.eslintignore
COPY .stylelintignore /cinema/.stylelintignore
COPY .stylelintrc /cinema/.stylelintrc

RUN npm install && npm run build

RUN cp -pr  public/assets/ compiled/assets/

RUN cp -pr compiled public package.json node_modules /deploy

WORKDIR /deploy

CMD [ "node", "compiled/server.js" ]