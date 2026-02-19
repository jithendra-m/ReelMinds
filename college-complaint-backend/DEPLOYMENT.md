# Deployment Guide

## Pre-Deployment Checklist

- [ ] Database created and accessible
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Database migrations run
- [ ] Upload directory created
- [ ] SSL certificates configured (production)
- [ ] CORS origins configured
- [ ] Rate limiting configured
- [ ] Logging configured

## Step-by-Step Deployment

### 1. Database Setup

```bash
# Create database
createdb college_complaints

# Or using psql
psql -U postgres
CREATE DATABASE college_complaints;
\q

# Run migrations
npm run migrate
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=production
PORT=3000

DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=college_complaints
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
DB_SSL=true

JWT_SECRET=your-very-secure-random-secret-key
JWT_EXPIRE=7d

CORS_ORIGIN=https://your-frontend-domain.com

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Install Dependencies

```bash
npm install --production
```

### 4. Create Required Directories

```bash
mkdir -p uploads
chmod 755 uploads
```

### 5. Start Server

**Using PM2 (Recommended):**
```bash
npm install -g pm2
pm2 start server.js --name complaint-api
pm2 save
pm2 startup
```

**Using systemd:**
Create `/etc/systemd/system/complaint-api.service`:
```ini
[Unit]
Description=College Complaint API
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/college-complaint-backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable complaint-api
sudo systemctl start complaint-api
```

**Using Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### 6. Nginx Configuration (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File upload size limit
    client_max_body_size 10M;
}
```

### 7. SSL Configuration (Let's Encrypt)

```bash
sudo certbot --nginx -d api.yourdomain.com
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret (min 32 characters)
3. **Database**: Use strong passwords, enable SSL
4. **Rate Limiting**: Configure appropriate limits
5. **CORS**: Only allow trusted origins
6. **Helmet**: Already configured for security headers
7. **File Uploads**: Validate file types and sizes
8. **Logging**: Monitor for suspicious activity

## Monitoring

### Health Check
```bash
curl http://localhost:3000/health
```

### Logs
```bash
# PM2
pm2 logs complaint-api

# systemd
journalctl -u complaint-api -f

# Docker
docker logs -f container-name
```

## Backup Strategy

### Database Backup
```bash
# Daily backup script
pg_dump -U postgres college_complaints > backup_$(date +%Y%m%d).sql

# Restore
psql -U postgres college_complaints < backup_20240115.sql
```

### File Uploads Backup
```bash
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

## Scaling Considerations

1. **Load Balancer**: Use nginx or cloud load balancer
2. **Database Connection Pool**: Already configured (max 20)
3. **Caching**: Consider Redis for session/token caching
4. **CDN**: Serve static uploads via CDN
5. **Horizontal Scaling**: Stateless design supports multiple instances

## Troubleshooting

### Database Connection Issues
- Check DB credentials in `.env`
- Verify PostgreSQL is running
- Check firewall rules
- Test connection: `psql -h host -U user -d database`

### File Upload Issues
- Check directory permissions
- Verify disk space
- Check file size limits
- Review Multer configuration

### Performance Issues
- Check database indexes
- Review query performance
- Monitor connection pool
- Check server resources

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] SSL/TLS configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Health checks working
- [ ] Error tracking configured
- [ ] Documentation updated
