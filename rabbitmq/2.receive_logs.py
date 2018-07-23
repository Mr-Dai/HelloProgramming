#!/usr/bin/env python
# coding=utf-8

import pika
from pika.credentials import PlainCredentials

# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 声明 Exchange
channel.exchange_declare(
    exchange='logs', exchange_type='fanout')

# 声明一个随机命名的专用队列
result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

# 绑定队列与 Exchange
channel.queue_bind(
    exchange='logs', queue=queue_name)

print ' [*] Waiting for logs. To exit press CTRL+C'

def callback(ch, method, properties, body):
    print ' [x] %r' % body

channel.basic_consume(
    callback, queue=queue_name, no_ack=True)

channel.start_consuming()
