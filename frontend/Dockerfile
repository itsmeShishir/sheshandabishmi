# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package descriptors and lockfile
COPY package*.json ./
RUN npm ci

# Copy all source files and build
COPY . .
RUN npm run build

# Stage 2: Serve compiled assets via Nginx
FROM nginx:1.27-alpine

# Copy built distribution files to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8540

CMD ["sh", "-c", "echo '' && echo '==================================================' && echo '  Frontend running at http://localhost:8540' && echo '==================================================' && echo '' && exec nginx -g 'daemon off;'"]

