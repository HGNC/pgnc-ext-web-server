FROM node:alpine as angular-build
WORKDIR /app

COPY . .
RUN npm i --silent && npm run build

RUN npm i -g @angular/cli --silent
RUN npm i --silent
RUN ng build --configuration production

FROM node:alpine
LABEL author="Kristian Gray"
WORKDIR /app
COPY --from=angular-build /app/dist/pgnc .
RUN npm i pm2 -g
# ENV PM2_PUBLIC_KEY=ssu8tbni55y0ky0
# ENV PM2_SECRET_KEY=***REMOVED_SECRET***
EXPOSE 4000

CMD ["node", "/app/server/server.mjs"]


