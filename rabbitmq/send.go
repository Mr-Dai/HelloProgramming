package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/streadway/amqp"
)

var host string
var port int
var username string
var password string
var queue string
var message string

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	flag.StringVar(&host, "host", "localhost", "hostname of the remote RabbitMQ instance")
	flag.IntVar(&port, "port", 5672, "port of the remote RabbitMQ instance")
	flag.StringVar(&username, "username", "guest", "username for RabbitMQ authentication")
	flag.StringVar(&password, "password", "guest", "password for RabbitMQ authentication")
	flag.StringVar(&queue, "queue", "hello", "name of the queue to use")
	flag.StringVar(&message, "message", "hello", "message to send")

	flag.Parse()

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
		false, // delete when unused
		false, // exclusive
		false, // no-wait
		nil,   // arguments
	)
	failOnError(err, fmt.Sprintf("Failed to declare queue `%s`", queue))

	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		})
	log.Printf(" [x] Send `%s` to queue `%s`", message, queue)
	failOnError(err, "Failed to publish a message")
}
