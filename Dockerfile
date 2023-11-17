FROM node:18.14.0 AS build

WORKDIR /adoptemos-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.14.0-slim

WORKDIR /adoptemos-app
COPY --from=build /adoptemos-app ./

EXPOSE 8080

CMD npm start
