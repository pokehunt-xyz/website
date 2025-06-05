FROM node:20-alpine AS base


# Install node modules
FROM base AS modules
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev


# Compile typescript
FROM base AS compiler
WORKDIR /app

COPY --from=modules /app/node_modules ./node_modules
COPY . .

RUN npm run build


# Final image
FROM nginx:1.27-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compiler /app/dist /var/www/html/

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]