#!/usr/bin/env python
# coding=utf-8

import sys

import pika
from pika.credentials import PlainCredentials


# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 声明 Topic Exchange
channel.exchange_declare(
    exchange='topic_logs', exchange_type='topic')

# 声明独占队列
result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

# 绑定队列与 Topic Exchange
binding_keys = sys.argv[1:]
if not binding_keys:
    sys.stderr.write('Usage: %s [binding_key]...\n' % sys.argv[0])
    sys.exit(1)

for binding_key in binding_keys:
    channel.queue_bind(
        exchange='topic_logs', queue=queue_name, routing_key=binding_key)

print ' [*] Waiting for logs. To exit press CTRL+C'

# 开始消费
def callback(ch, method, properties, body):
    print ' [x] %r: %r' % (method.routing_key, body)

channel.basic_consume(
    callback, queue=queue_name, no_ack=True)

channel.start_consuming()
