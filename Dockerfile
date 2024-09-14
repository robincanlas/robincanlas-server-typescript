# build environment
FROM node:20-alpine as build

COPY . /app

WORKDIR /app

RUN npm install --silent

RUN npm run build


# production environment
FROM node:20-alpine

COPY --from=build /app/dist /app/dist

COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

EXPOSE 80

CMD ["node", "dist/index.js"]