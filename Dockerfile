# build environment
FROM node:14-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
RUN apk add --no-cache python3 py3-pip make g++
RUN npm install
COPY public /app/public/
COPY src /app/src/
COPY .env.* /app/
RUN npm run build

# deploy environment
FROM nginx:1-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

