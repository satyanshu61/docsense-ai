# Deploying to AWS EC2 (Amazon Linux)

This document shows how to check the Linux version on an EC2 instance and provides simple instructions to run the backend without Docker using `systemd` or `pm2`.

1) How to check the Linux / Amazon Linux version

Run on the EC2 host:

```bash
cat /etc/os-release
uname -a
```

On Amazon Linux 2 you'll see something like `NAME="Amazon Linux"` and `VERSION="2"` in `/etc/os-release`.

2) Install Node.js (example using NodeSource for Node 18)

```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

3) Prepare the app

On the EC2 instance, clone or copy the repo, then:

```bash
cd docsense-ai/backend
npm install --production
cp .env.example .env
# edit .env with your values (MONGO_URI, GEMINI_API_KEY, JWT_SECRET, etc.)
```

4) Run with `systemd` (recommended for simple deployments)

Create `/etc/systemd/system/docsense.service` with:

```ini
[Unit]
Description=DocSense AI Backend
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/docsense-ai/backend
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable docsense.service
sudo systemctl start docsense.service
sudo journalctl -u docsense.service -f
```

5) Alternative: Use `pm2` for process management

```bash
sudo npm install -g pm2
pm2 start server.js --name docsense
pm2 save
pm2 startup systemd
```

6) Network / Security

- Open port `5000` (or your chosen port) in the EC2 Security Group.
- If you need TLS, place a reverse proxy (nginx) on the instance or use an ALB with HTTPS.

7) Notes

- Use `cat /etc/os-release` to confirm the exact Amazon Linux version.
- For production consider running behind nginx, enable firewall rules, and use a managed database (MongoDB Atlas) or an RDS alternative.

8) Amazon Linux 2023 specifics

On Amazon Linux 2023 use `dnf` (or `yum` compatibility) to install packages. Example commands tested on AL2023:

```bash
sudo dnf update -y
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs nginx
sudo systemctl enable --now nginx
```

If `python3-certbot-nginx` is available via dnf, install it; otherwise use `snapd` to install certbot:

```bash
# preferred
sudo dnf install -y certbot python3-certbot-nginx
# fallback (if certbot package not available):
sudo dnf install -y snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Then request a certificate:

```bash
sudo certbot --nginx -d your.domain.example
```

9) PM2 process manager (recommended)

Install and run with PM2 so the app restarts on failure and reboots:

```bash
sudo npm install -g pm2
cd ~/docsense-ai/backend
npm install --production
pm2 start server.js --name docsense
pm2 save
pm2 startup systemd
# follow the printed command to enable the startup service
```

Logs:

```bash
pm2 logs docsense
```

10) Example nginx config file

See `deploy/nginx/docsense.conf` in this repo for a minimal reverse-proxy. Place it under `/etc/nginx/conf.d/` and reload nginx:

```bash
sudo cp deploy/nginx/docsense.conf /etc/nginx/conf.d/docsense.conf
sudo nginx -t
sudo systemctl reload nginx
```

