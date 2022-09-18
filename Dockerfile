### STAGE 1: Build ###
FROM node:14.15 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

RUN npm run build

### STAGE 2: Run ###
FROM node:14.15
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.next ./.next

CMD ["npm", "run", "start"]
