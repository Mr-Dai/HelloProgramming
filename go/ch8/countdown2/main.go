package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	abort := make(chan bool)
	go func() {
		os.Stdin.Read(make([]byte, 1))
		abort <- true
	}()

	tick := time.Tick(1 * time.Second)
	fmt.Println("Commencing countdown. Press return to abort.")
	for countdown := 10; countdown > 0; countdown-- {
		fmt.Println(countdown)
		select {
		case <-tick:
		case <-abort:
			fmt.Println("Launch aborted!")
			return
		}
	}
	fmt.Println("Booster initiate.")
}
