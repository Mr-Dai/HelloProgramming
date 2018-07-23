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

# 发送消息
routing_key = sys.argv[1] if len(sys.argv) > 2 else 'anonymous.info'
message = ' '.join(sys.argv[2:]) or 'Hello World!'

channel.basic_publish(
    exchange='topic_logs', routing_key=routing_key, body=message)

print ' [x] Sent %r: %r' % (routing_key, message)

# 关闭连接
connection.close()
