#!/usr/bin/env python
# coding=utf-8

import time

import pika
from pika.credentials import PlainCredentials

# 建立连接
connection = pika.BlockingConnection(pika.ConnectionParameters(
    host='localhost', credentials=PlainCredentials('rabbit', 'rabbit')))
channel = connection.channel()

# 创建 RabbitMQ 队列
channel.queue_declare(queue='task_queue', durable=True)

def msg_recv_callback(ch, method, properties, body):
    print ' [x] Received %r' % body
    time.sleep(body.count('.'))
    print ' [x] Done'
    ch.basic_ack(delivery_tag = method.delivery_tag)

# 限制消息投递并发量
channel.basic_qos(prefetch_count=1)
channel.basic_consume(
    msg_recv_callback,
    queue='task_queue')

print ' [*] Waiting for messages. To exit press CTRL+C'
channel.start_consuming()
