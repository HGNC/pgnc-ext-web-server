FROM node:20-alpine as builder
WORKDIR /app

# Set memory limit and environment
ENV NODE_OPTIONS="--max_old_space_size=8192"
ENV NODE_ENV=development
ARG API_USER
ENV API_USER=$API_USER
ARG API_PASSWORD
ENV API_PASSWORD=$API_PASSWORD

# Update npm and install CLI tools first
RUN npm install -g npm@latest
RUN npm install -g @angular/cli@19.1.3

# Install envsubst
RUN apk add --no-cache gettext

# Copy only package files first to leverage layer caching
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .
# Substitute environment variables into the environment.ts file
RUN envsubst < src/environments/environment.ts > src/environments/environment.tmp.ts &&  \
    mv src/environments/environment.tmp.ts src/environments/environment.ts

# Build the application
RUN ng build --configuration production \
    --output-path=dist/pgnc \
    --progress false \
    --aot true \
    --optimization true \
    --output-hashing all

# Production stage
FROM node:20-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/dist/pgnc ./dist/pgnc

# Install production deps
# COPY package*.json ./

# RUN npm ci --omit=dev

EXPOSE 4000

CMD ["node", "dist/pgnc/server/server.mjs"]
