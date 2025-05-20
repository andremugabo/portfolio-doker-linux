FROM node:16

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build if needed (uncomment if your backend needs building)
# RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "dev"]