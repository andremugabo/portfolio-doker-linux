FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./

# Copy source code
COPY . .
RUN npm install

# Build if needed (uncomment if your backend needs building)
# RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "dev"]
