FROM node:16-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 4200
CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]
