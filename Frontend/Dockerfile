# Stage 1: Build React app
FROM node:20 AS build
WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy project files and build
COPY . .
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]