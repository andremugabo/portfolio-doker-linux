# Portfolio Deployment with Docker & Traefik

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)
![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=flat&logo=traefikproxy&logoColor=white)

A simple HTML/CSS/JS portfolio deployed with Docker and Traefik reverse proxy, featuring:
- Automatic SSL certificates (Let's Encrypt)
- Load balancing
- Secure dashboard
- Simple static file serving

## Project Structure

```
portfolio-doker-linux/
├── portfolio-frontend/          # Static HTML/CSS/JS files
│   ├── assets/                  # Static assets
│   ├── css/                     # CSS files
│   ├── js/                      # JavaScript files
│   ├── index.html               # Main page
│   ├── Dockerfile               # Frontend container config
│   └── nginx.conf               # Nginx server config
├── portfolio-backend/           # Node.js backend (if applicable)
│   ├── src/                     # Backend source code
│   └── Dockerfile               # Backend container config
├── traefik/
│   └── config/                  # Traefik configuration
│       ├── traefik.yml          # Main config
│       ├── acme.json            # SSL certificates
│       └── users                # Dashboard credentials
├── docker-compose.yml           # Full deployment setup
└── README.md                    # This file
```

## Prerequisites

- Docker Engine (v20.10+)
- Docker Compose (v1.29+)
- Git
- Domain names pointing to your server:
  - `portfolio-25337.auca.ac.rw`
  - `api-25337.auca.ac.rw` (for backend)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-doker-linux.git
cd portfolio-doker-linux
```

2. Create Docker network:
```bash
docker network create traefik_net
```

3. Set up Traefik credentials:
```bash
echo $(htpasswd -nb admin yourpassword) | sed -e s/\\$/\\$\\$/g > traefik/config/users
```

4. Start the services:
```bash
docker-compose up -d --build
```

## Accessing Services

| Service        | URL                                      | Port  |
|----------------|------------------------------------------|-------|
| Frontend       | http://portfolio-25337.auca.ac.rw       | 8080  |
| Frontend (SSL) | https://portfolio-25337.auca.ac.rw      | 8444  |
| Backend API    | http://api-25337.auca.ac.rw/api         | 8080  |
| Backend (SSL)  | https://api-25337.auca.ac.rw/api        | 8444  |
| Traefik Dashboard | http://your-server-ip:8080/dashboard/ | 8080  |

## Configuration

### Frontend Customization
- Edit files in `portfolio-frontend/`
- Main page: `portfolio-frontend/index.html`
- Styles: `portfolio-frontend/css/`
- Scripts: `portfolio-frontend/js/`

### Nginx Configuration
Modify `portfolio-frontend/nginx.conf` for:
- Custom routing rules
- Cache settings
- Server optimizations

### Traefik Settings
Edit `traefik/config/traefik.yml` for:
- Different entry points
- SSL configurations
- Middleware setups

## Maintenance

### Update Containers
```bash
docker-compose up -d --build
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

## Security Notes

1. Change default passwords in:
   - Traefik dashboard (`traefik/config/users`)
   - MySQL container (`docker-compose.yml`)

2. For production:
   - Set `insecure: false` in `traefik.yml`
   - Restrict dashboard access to specific IPs
   - Enable additional security middlewares

## Troubleshooting

### Common Issues

**SSL not working:**
- Verify DNS records are propagated
- Check Traefik logs: `docker logs traefik`
- Ensure ports 8080 and 8444 are open

**Frontend not updating:**
- Clear browser cache
- Rebuild containers: `docker-compose build --no-cache frontend`

**Database connection issues:**
- Verify MySQL container is running
- Check environment variables in `docker-compose.yml`

## License

[MIT License](LICENSE)

---