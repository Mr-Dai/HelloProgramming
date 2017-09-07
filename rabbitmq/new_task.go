package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"strings"

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
	flag.StringVar(&queue, "queue", "task_queue", "name of the queue to send task to")
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
		true,  // durable
		false, // delete when unused
		false, // exclusive
		false, // no-wait
		nil,   // arguments
	)
	failOnError(err, fmt.Sprintf("Failed to declare queue `%s`", queue))

	body := bodyFrom(os.Args)
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,
		amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "text/plain",
			Body:         []byte(body),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf(" [x] Sent `%s`", body)
}

func bodyFrom(args []string) string {
	var s string
	if (len(args) < 2) || os.Args[1] == "" {
		s = "hello"
	} else {
		s = strings.Join(args[1:], " ")
	}
	return s
}
