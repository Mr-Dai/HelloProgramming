FROM ubuntu:16.04
MAINTAINER Robert Peng "robert.peng@foxmail.com"
ENV REFRESHED_AT 2017-06-11
RUN apt-get -y update

# Install Redis
RUN apt-get -y install redis-server redis-tools
EXPOSE 6379
ENTRYPOINT [ "/usr/bin/redis-server" ]
CMD []
