### BUILD ###
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

COPY postinstall.js ./

RUN npm ci

COPY . .

RUN npm run build

### PRODUCTION ###
FROM node:lts-alpine AS production

WORKDIR /app

COPY --from=build /app/build .
RUN npm install serve -g

COPY .env.example .env
COPY ./env.sh .

RUN apk add --no-cache bash
RUN chmod +x env.sh

EXPOSE 3000

CMD ["/bin/bash", "-c", "./env.sh && serve -s -l 3000"]