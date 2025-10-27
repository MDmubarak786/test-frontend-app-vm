# EC2 Testing Setup Guide

## ⚠️ WARNING: FOR TESTING/DEVELOPMENT ONLY
This setup exposes your services to the internet without restrictions. **DO NOT USE IN PRODUCTION**.

## 1. EC2 Security Group Configuration

### Create Security Group with Open Access (Testing Only)
```
Security Group Rules:
┌─────────────┬────────────┬─────────────┬─────────────────────┐
│ Type        │ Port Range │ Protocol    │ Source              │
├─────────────┼────────────┼─────────────┼─────────────────────┤
│ SSH         │ 22         │ TCP         │ 0.0.0.0/0           │
│ HTTP        │ 80         │ TCP         │ 0.0.0.0/0           │
│ HTTPS       │ 443        │ TCP         │ 0.0.0.0/0           │
│ Custom      │ 3000       │ TCP         │ 0.0.0.0/0           │
│ Custom      │ 5000       │ TCP         │ 0.0.0.0/0           │
│ Custom      │ 8080       │ TCP         │ 0.0.0.0/0           │
│ All Traffic │ All        │ All         │ 0.0.0.0/0 (if lazy) │
└─────────────┴────────────┴─────────────┴─────────────────────┘
```

## 2. EC2 Instance Setup

### Install Docker and Docker Compose
```bash
# Update system
sudo apt update

# Install Docker
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Create project directories
```bash
mkdir -p ~/frontend
mkdir -p ~/backend
```

## 3. GitHub Secrets Setup

Add these secrets to your GitHub repository:

### For Current Workflow (deploy-frontend.yml):
```
FRONTEND_EC2_SSH_KEY    # Your private SSH key content
FRONTEND_EC2_HOST       # EC2 public IP (e.g., 54.123.45.67)
EC2_USERNAME           # ubuntu (for Ubuntu) or ec2-user (for Amazon Linux)
```

### For Simple Workflow (deploy-simple.yml):
```
EC2_SSH_KEY            # Your private SSH key content  
EC2_HOST               # EC2 public IP (e.g., 54.123.45.67)
EC2_USERNAME           # ubuntu or ec2-user
```

## 4. Docker Configuration Updates

### Update nginx.conf for public access
Replace `BACKEND_EC2_PRIVATE_IP` with your backend EC2's **public IP**:

```nginx
# In nginx.conf, change this line:
proxy_pass http://BACKEND_EC2_PRIVATE_IP:5000/api/;

# To this (using public IP for testing):
proxy_pass http://YOUR_BACKEND_PUBLIC_IP:5000/api/;
```

### Ensure Docker containers bind to all interfaces
In your docker-compose.yml, make sure ports are exposed:

```yaml
services:
  frontend:
    build: .
    ports:
      - "80:80"    # Accessible at http://EC2_PUBLIC_IP
    restart: unless-stopped
```

## 5. Access Your Applications

### Frontend
```
http://YOUR_FRONTEND_EC2_PUBLIC_IP
```

### Backend (if separate EC2)
```
http://YOUR_BACKEND_EC2_PUBLIC_IP:5000
```

## 6. Troubleshooting

### Check if containers are running
```bash
docker-compose ps
docker-compose logs
```

### Check if ports are accessible
```bash
# On EC2 instance
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5000

# Test from outside
curl http://YOUR_EC2_PUBLIC_IP
```

### Common Issues
1. **Container not accessible**: Ensure Docker binds to `0.0.0.0`, not `127.0.0.1`
2. **SSH connection fails**: Check key permissions (`chmod 600`)
3. **Port blocked**: Verify security group rules
4. **Docker build fails**: Check if EC2 has enough disk space

## 7. Quick Commands

### Redeploy manually
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
cd ~/frontend
git pull  # if using git
docker-compose down
docker-compose up -d --build
```

### View logs
```bash
docker-compose logs -f
```

### Clean up Docker
```bash
docker system prune -f
docker image prune -f
```

---

**Remember**: This setup is for testing only. For production:
- Use private subnets
- Restrict security groups to specific IPs
- Use HTTPS with SSL certificates
- Implement proper authentication
- Use environment variables for sensitive data
