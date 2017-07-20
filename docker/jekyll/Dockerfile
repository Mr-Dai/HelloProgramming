FROM debian

RUN apt-get -y update
RUN apt-get -y install ruby ruby-dev make nodejs gcc
RUN gem install --no-rdoc --no-ri jekyll

VOLUME /data
VOLUME /var/www/html
WORKDIR /data

ENTRYPOINT [ "jekyll", "build", "--destination=/var/www/html" ]
