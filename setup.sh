#!/bin/bash

# Create Docker network
docker network create traefik_net

# Generate Traefik credentials
echo "Creating Traefik credentials..."
htpasswd -nb admin securepassword | sed -e s/\\$/\\$\\$/g > traefik/config/users

# Build and start containers
echo "Starting services..."
docker-compose up -d --build

echo "Setup complete!"
echo "Access:"
echo "- Frontend: http://portfolio-25337.auca.ac.rw:8080"
echo "- Backend API: http://api-25337.auca.ac.rw:8080/api"
echo "- Traefik Dashboard: http://localhost:8080/dashboard/"