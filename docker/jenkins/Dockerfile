FROM ubuntu:16.04
MAINTAINER Robert Peng "robert.peng@foxmail.com"
ENV REFRESHED_AT 2017-06-11
RUN apt-get update -y

# Install OpenJDK8
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:openjdk-r/ppa -y
RUN apt-get update -y
RUN apt-get install openjdk-8-jdk -y

# Install other necessities
RUN apt-get install -y iptables git-core

# Install Docker
RUN apt-get install -y apt-transport-https ca-certificates curl
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update -y
RUN apt-get install -y docker-ce

# Download Jenkins
ENV JENKINS_HOME /opt/jenkins/data
ENV JENKINS_MIRROR http://mirrors.jenkins.io
RUN mkdir -p $JENKINS_HOME/plugins
RUN curl -s -o /opt/jenkins/jenkins.war -L $JENKINS_MIRROR/war-stable/latest/jenkins.war

RUN for plugin in chucknorris greenballs scm-api git-client git ws-cleanup credentials \
      ssh-credentials structs workflow-scm-step workflow-durable-task-step matrix-project \
      resource-disposer junit script-security workflow-step-api workflow-api workflow-support \
      durable-task mailer display-url-api; do \
      curl -s -o $JENKINS_HOME/plugins/${plugin}.hpi \
        -L $JENKINS_MIRROR/plugins/${plugin}/latest/${plugin}.hpi; \
    done

ADD ./dockerjenkins.sh /usr/local/bin/dockerjenkins.sh
RUN chmod +x /usr/local/bin/dockerjenkins.sh

VOLUME /var/lib/docker

EXPOSE 8080

ENTRYPOINT [ "/usr/local/bin/dockerjenkins.sh" ]


