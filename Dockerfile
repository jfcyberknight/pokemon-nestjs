FROM node:latest as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install --only-production
COPY --from=build /app/dist ./dist
CMD npm run start:prod