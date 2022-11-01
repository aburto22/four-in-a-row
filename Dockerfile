FROM node:18-alpine

RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm

RUN npm install -g turbo

WORKDIR /app

COPY . .

RUN pnpm install

RUN npx turbo run build --filter=server

WORKDIR /app/apps/server

EXPOSE 8080

CMD ["npm", "start"]