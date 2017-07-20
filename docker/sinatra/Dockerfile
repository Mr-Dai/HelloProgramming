FROM ubuntu:16.04
MAINTAINER Robert Peng "robert.peng@foxmail.com"
ENV REFRESHED_AT=2017-06-11
RUN apt-get update -y

# Install Sinatra
RUN apt-get -y install ruby ruby-dev build-essential redis-tools
RUN gem install --no-rdoc --no-ri sinatra json redis

RUN mkdir -p /opt/webapp

EXPOSE 4567

CMD [ "/opt/webapp/bin/webapp" ]
