# EC2 SSL Setup Guide (Frontend)

This document provides step-by-step instructions for installing and configuring SSL certificates on your **frontend EC2 instance** using **Certbot**.

---

## 1. Install Certbot and Dependencies

SSH into your frontend EC2 instance and install Certbot along with the Nginx plugin.

**Reference:** GitHub Actions workflow file

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

---

## 2. Generate SSL Certificates

Before running the Certbot command, **stop the frontend Docker container** to free up port **80**, as Certbot’s standalone mode requires it for domain verification.

Run the following command to create an SSL certificate for your domain:

```bash
sudo certbot certonly --standalone -d your-domain.com
```

### Stop the Frontend Container

```bash
docker stop <frontend-container-name or frontend-container-id>
```

### Restart After SSL Creation

```bash
docker start <frontend-container-name or frontend-container-id>
```

---

## 3. Verify Certificate Creation

After successful certificate generation, verify that the certificate files exist in the Let’s Encrypt directory:

```bash
sudo ls /etc/letsencrypt/live/your-domain.com/
```

You should see the following files:

```
cert.pem
chain.pem
fullchain.pem
privkey.pem
```

---

**Location in repository:**  
`/infrastructure/certbot/ssl_setup.md`
