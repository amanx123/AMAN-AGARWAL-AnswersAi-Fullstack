# Stage 1

FROM node:18 as builder

WORKDIR /build

COPY package*.json ./

RUN npm install -g pnpm
RUN npm install

COPY . .

COPY .env.production .env.production
COPY ./client-certificates ./client-certificates

RUN npm run build



# Stage 2

FROM node:18 as runner

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/client-certificates ./client-certificates
COPY --from=builder /build/.env.production ./.env.production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]


