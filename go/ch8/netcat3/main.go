package main

import (
	"io"
	"log"
	"net"
	"os"
)

func main() {
	conn, err := net.Dial("tcp", "www.baidu.com:80")
	tcpConn := conn.(*net.TCPConn)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected!")
	done := make(chan struct{})
	go func() {
		mustCopy(os.Stdout, tcpConn)
		log.Println("done")
		done <- struct{}{} // signal the main goroutine
	}()
	mustCopy(tcpConn, os.Stdin)
	tcpConn.CloseWrite()
	<-done // wait for background goroutine to finish
	tcpConn.CloseRead()
}

func mustCopy(dst io.Writer, src io.Reader) {
	if _, err := io.Copy(dst, src); err != nil {
		log.Fatal(err)
	}
}
