package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/streadway/amqp"
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
	flag.StringVar(&queue, "queue", "hello", "name of the queue to listen to")

	uri := fmt.Sprintf("amqp://%s:%s@%s:%d/", username, password, host, port)
	conn, err := amqp.Dial(uri)
	failOnError(err, fmt.Sprintf("Failed to connect to `%s`", uri))
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		queue, // name
		false, // durable
		false, // delete when usused
		false, // exclusive
		false, // no-wait
		nil,   // arguments
	)
	failOnError(err, fmt.Sprintf("Failed to declare queue `%s`", queue))

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: `%s`", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages on queue `%s`. To exit press CTRL+C", queue)
	<-forever
}
