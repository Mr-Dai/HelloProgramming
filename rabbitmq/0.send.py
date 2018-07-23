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

# 发送消息
channel.basic_publish(
    exchange='',          # 使用默认 Exchange
    routing_key='hello',  # 发送至 `hello` 队列
    body='Hello World!')
print " [x] Sent 'Hello World!'"

# 关闭连接，退出程序
connection.close()
