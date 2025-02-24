# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 2: app
FROM node:20-alpine AS app

RUN apk add --no-cache curl

WORKDIR /app

COPY --from=build /app/db ./db
COPY --from=build /app/config ./config
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules /app/node_modules

RUN chmod +x /config/entrypoint-listener.sh

EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main.js"]
