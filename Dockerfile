# build environment
FROM node:12.2.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
RUN npm install --silent
COPY public /app/public/
COPY src /app/src/
COPY .env.* /app/
RUN npm run build

# deploy environment
FROM nginx:1-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

