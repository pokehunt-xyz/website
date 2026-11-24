FROM node:lts-alpine AS base


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
# Non-slim image ships the njs module (needed for the CSP nonce)
FROM nginx:stable-alpine

# load_module must be in the main context, so prepend it to nginx.conf
RUN sed -i '1i load_module modules/ngx_http_js_module.so;' /etc/nginx/nginx.conf

COPY ./nginx/csp.js /etc/nginx/njs/csp.js
COPY ./nginx/template.conf /etc/nginx/templates/default.conf.template
COPY ./nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=compiler /app/dist /var/www/html/

COPY docker-entrypoint-custom.sh /docker-entrypoint-custom.sh
RUN chmod +x /docker-entrypoint-custom.sh

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint-custom.sh"]
CMD ["nginx", "-g", "daemon off;"]
