#!/usr/bin/env python
# coding=utf-8

import sys

import pika
from pika.credentials import PlainCredentials

# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 创建 RabbitMQ 队列
channel.queue_declare(queue='task_queue', durable=True)

# 发送任务消息
message = ' '.join(sys.argv[1:]) or 'Hello World!'
channel.basic_publish(
    exchange='',
    routing_key='task_queue',
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=2,
    ))
print ' [x] Sent %r' % message
