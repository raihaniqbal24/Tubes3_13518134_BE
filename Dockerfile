FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY . .

RUN npx sequelize db:migrate

RUN adduser -D restapi
USER restapi

CMD npm start $PORT
