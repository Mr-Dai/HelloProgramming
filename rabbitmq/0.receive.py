#!/usr/bin/env python
# coding=utf-8

import pika
from pika.credentials import PlainCredentials

# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 创建 RabbitMQ 队列
channel.queue_declare(queue='hello')

def msg_recv_callback(ch, method, properties, body):
    print ' [x] Received %r' % body

channel.basic_consume(
    msg_recv_callback,
    queue='hello',
    no_ack=True)

print ' [*] Waiting for messages. To exit press CTRL+C'
channel.start_consuming()
