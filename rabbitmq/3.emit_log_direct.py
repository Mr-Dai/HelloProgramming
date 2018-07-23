#!/usr/bin/env python
# coding=utf-8

import sys

import pika
from pika.credentials import PlainCredentials

# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 声明 Exchange
channel.exchange_declare(
    exchange='direct_logs', exchange_type='direct')

severity = sys.argv[1] if len(sys.argv) > 2 else 'info'
message = ' '.join(sys.argv[2:]) or 'Hello World!'

# 发送消息
channel.basic_publish(
    exchange='direct_logs', routing_key=severity, body=message)
print ' [x] Sent %r: %r' % (severity, message)
connection.close()
