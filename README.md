-On the back end web servers, run the following commands to install NGINX:
`sudo apt-get install -y nginx`
uname -n | sudo tee /usr/share/nginx/html/index.html
-On the load balancer, run the follow commands:
`sudo apt-get install -y nginx`


Use the following as the contents of /etc/nginx/sites-available/default:
upstream web_backend {
# Uncomment for the IP Hashing load balancing method:
# ip_hash;
# Uncomment for the Least Connected load balancing method:
# least_conn;
# Replace the IP addresses with the IP addresses
# (or host names) of your back end web servers.
# Examples:
# server www1.example.com:8080;
# server 192.168.1.100;
    server 10.11.12.51;
    server 10.11.12.52;
}
server {
    listen 80;
    location / {
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://web_backend;
    }
}
Make NGINX read the new configuration by running the following command:
`sudo service nginx reload`
