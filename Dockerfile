FROM node:18-alpine

WORKDIR /app


COPY . .
RUN npm
RUN yarn build

CMD [ "yarn", "start:prod"]