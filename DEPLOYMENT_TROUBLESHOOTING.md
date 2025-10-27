# Deployment Troubleshooting Guide

## Error: "ssh: connect to host *** port 22: Connection timed out"

### Quick Checklist:

#### 1. ✅ Verify EC2 Instance Status
```bash
# Check if your EC2 is running in AWS Console
# Status should be: "running"
# Instance State: "running"
```

#### 2. ✅ Test SSH Connection Manually
```bash
# Replace with your actual values
ssh -i your-private-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# If this fails, the issue is with EC2/network, not GitHub Actions
```

#### 3. ✅ Check Security Group Rules
In AWS Console → EC2 → Security Groups:
```
Inbound Rules:
Type: SSH
Port: 22  
Source: 0.0.0.0/0 (for testing)
```

#### 4. ✅ Verify GitHub Secrets
Go to GitHub → Settings → Secrets and variables → Actions:

**EC2_SSH_KEY**: 
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAlwAAAAdzc2gtcn
... (your private key content)
-----END OPENSSH PRIVATE KEY-----
```

**EC2_HOST**: 
```
54.123.45.67  (your EC2 public IP)
```

**EC2_USERNAME**: 
```
ubuntu  (for Ubuntu instances)
ec2-user  (for Amazon Linux instances)
```

#### 5. ✅ Check Network Configuration

**VPC/Subnet Issues:**
- Ensure EC2 is in a **public subnet**
- Internet Gateway should be attached to VPC
- Route table should have route to Internet Gateway (0.0.0.0/0)

**Network ACLs:**
- Should allow inbound/outbound traffic on port 22

#### 6. ✅ Test from Different Location
```bash
# Try connecting from your local machine
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# If local works but GitHub Actions doesn't:
# - Check if EC2 security group restricts source IPs
# - GitHub Actions IPs change frequently
```

## Alternative Solutions:

### Option 1: Use GitHub's IP Ranges (More Secure)
```bash
# Get GitHub's IP ranges
curl https://api.github.com/meta | jq '.actions[]'

# Add these to your security group instead of 0.0.0.0/0
```

### Option 2: Use Self-Hosted Runner
```yaml
# In your workflow
runs-on: self-hosted  # Instead of ubuntu-latest
```

### Option 3: Use Different Deployment Method
```yaml
# Use AWS CLI with IAM roles instead of SSH
- name: Deploy with AWS CLI
  run: |
    aws s3 sync ./dist s3://your-bucket
    aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Debug Commands for EC2:

### Check SSH Service
```bash
sudo systemctl status ssh
sudo systemctl start ssh  # if not running
```

### Check Network Connectivity
```bash
# On EC2 instance
sudo netstat -tlnp | grep :22
sudo ufw status  # Check firewall
```

### Check Logs
```bash
# SSH logs
sudo tail -f /var/log/auth.log

# System logs  
sudo journalctl -u ssh -f
```

## Common Fixes:

### Fix 1: Restart SSH Service
```bash
sudo systemctl restart ssh
```

### Fix 2: Check SSH Configuration
```bash
sudo nano /etc/ssh/sshd_config
# Ensure: PasswordAuthentication no
# Ensure: PubkeyAuthentication yes
sudo systemctl restart ssh
```

### Fix 3: Regenerate SSH Key Pair
```bash
# Generate new key pair
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add public key to EC2
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Use private key in GitHub secrets
cat ~/.ssh/id_ed25519  # Copy this to EC2_SSH_KEY secret
```

## Test the Updated Workflow:

The updated `deploy-simple.yml` includes debug steps:
1. Tests network connectivity
2. Verifies SSH connection
3. Shows detailed error messages

Run it and check the GitHub Actions logs for specific error details.

---

**If none of these work, share the specific error messages from the debug workflow for more targeted help.**
