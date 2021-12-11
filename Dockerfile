# build environment
FROM node:13-alpine as build

COPY . /app

WORKDIR /app

RUN npm install --silent

RUN npm run build


# production environment
FROM node:13-alpine

COPY --from=build /app/dist /app
# COPY --from=build /app/src/swagger.json /app/swagger.json
COPY --from=build /app/src/index.html /app/index.html

COPY package.json /app/

WORKDIR /app

RUN npm install --silent

EXPOSE 80

ENTRYPOINT ["node", "/app/index.js"]
