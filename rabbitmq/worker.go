package main

import (
	"bytes"
	"flag"
	"fmt"
	"github.com/streadway/amqp"
	"log"
	"time"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

var host string
var port int
var username string
var password string
var queue string

func main() {
	flag.StringVar(&host, "host", "localhost", "hostname of the remote RabbitMQ instance")
	flag.IntVar(&port, "port", 5672, "port of the remote RabbitMQ instance")
	flag.StringVar(&username, "username", "guest", "username for RabbitMQ authentication")
	flag.StringVar(&password, "password", "guest", "password for RabbitMQ authentication")
	flag.StringVar(&queue, "queue", "task_queue", "name of the queue to listen to")
	flag.Parse()

	uri := fmt.Sprintf("amqp://%s:%s@%s:%d/", username, password, host, port)
	conn, err := amqp.Dial(uri)
	failOnError(err, fmt.Sprintf("Failed to connect to `%s`", uri))
	defer conn.Close()

	q, err := ch.QueueDeclare(
		queue, // name
		true,  // durable
		false, // delete when unused
		false, // exclusive
		false, // no-wait
		nil,   // arguments
	)
	failOnError(err, fmt.Sprintf("Failed to declare queue `%s`", queue))

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	failOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			dot_count := bytes.Count(d.Body, []byte("."))
			t := time.Duration(dot_count)
			time.Sleep(t * time.Second)
			log.Printf("Done")
			d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
