# Set nginx base image
FROM private-registry.rootcloud.com/devops/nginx:1.19.4

# File Author / Maintainer
MAINTAINER devin.pi devin.pi@irootech.com

ADD dist /usr/local/nginx/html

RUN find /usr/local/nginx/html -type f -exec chmod 644 {} \; \
  && find /usr/local/nginx/html -type d -exec chmod 755 {} \;


# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT []
CMD nginx -g "daemon off;"

