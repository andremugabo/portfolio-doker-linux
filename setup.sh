#!/bin/bash

# Get absolute path to project
PROJECT_DIR=$(pwd)

echo "=== Setting up Docker Portfolio ==="

# Clean up any previous setup
echo "Cleaning previous setup..."
docker-compose down -v 2>/dev/null
docker network rm traefik_net 2>/dev/null

# Create Docker network
echo "Creating traefik_net network..."
docker network create traefik_net

# Set up Traefik files
echo "Configuring Traefik..."
mkdir -p traefik/config
touch traefik/config/acme.json
chmod 600 traefik/config/acme.json

# Create minimal traefik.yml if missing
if [ ! -f traefik/config/traefik.yml ]; then
  cat > traefik/config/traefik.yml << 'EOF'
api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":8080"
  websecure:
    address: ":8444"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: "traefik_net"
EOF
fi

# Generate credentials
echo "Creating auth credentials..."
echo $(htpasswd -nb admin securepassword) | sed -e s/\\$/\\$\\$/g > traefik/config/users

# Build and start
echo "Starting services..."
docker-compose up -d --build

echo "=== Setup Complete ==="
echo "Access:"
echo "- Frontend: http://portfolio-25337.auca.ac.rw:8080"
echo "- Traefik Dashboard: http://localhost:8080/dashboard/"
