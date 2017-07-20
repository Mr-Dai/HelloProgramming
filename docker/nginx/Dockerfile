FROM ubuntu:16.04
MAINTAINER Robert Peng "robert.peng@foxmail.com"
ENV REFRESHED_AT=2017-06-11
RUN apt-get -y update

# Install Nginx
RUN apt-get -y install nginx

RUN mkdir -p /var/www/html/website
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
