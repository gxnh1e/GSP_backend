FROM node:18-alpine

WORKDIR /app


COPY . .
RUN yarn build

CMD [ "yarn", "start:prod"]