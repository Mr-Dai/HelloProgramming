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
channel.exchange_declare(exchange='logs',
                         exchange_type='fanout')

# 发送消息
message = ' '.join(sys.argv[1:]) or 'info: Hello World!'
channel.basic_publish(exchange='logs',
                      routing_key='',
                      body=message)
print ' [x] Sent %r' % message

# 关闭连接
connection.close()
