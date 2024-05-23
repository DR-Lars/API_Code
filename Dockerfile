FROM node:latest

WORKDIR /app

COPY . .
RUN npm install
RUN npm install dotenv

CMD node ./index.js
EXPOSE 8080
