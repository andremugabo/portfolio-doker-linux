# Simple static file server (no Node.js build needed)
FROM nginx:alpine

# Copy all frontend files to nginx
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80