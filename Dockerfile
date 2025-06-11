FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package.json package-lock.json* ./ 

# Install dependencies only once
RUN npm install

# Copy source code after dependencies installed
COPY . .

# Build app for production
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
# Start nginx (default command)
CMD ["nginx", "-g", "daemon off;"]