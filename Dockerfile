FROM node:18-alpine

WORKDIR /app


COPY . .
RUN npm
RUN npm build

CMD [ "npm", "start" ]