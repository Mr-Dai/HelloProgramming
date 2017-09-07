package main

import (
	"flag"
	"fmt"
	"runtime"
)

var goMaxProcs int

func main() {
	flag.IntVar(&goMaxProcs, "max_procs", runtime.NumCPU(), "set the GOMAXPROCS of this program")
	flag.Parse()
	runtime.GOMAXPROCS(goMaxProcs)
	c := make(chan struct{})
	fmt.Println("Starting 1st Goroutine...")
	go printSequence(20000, c)
	fmt.Println("Starting 2nd Goroutine...")
	go printSequence(20000, c)
	<-c
	<-c
}

func printSequence(limit int, c chan struct{}) {
	for i := 0; i < limit; i++ {
		fmt.Printf("%d\n", i)
	}
	c <- struct{}{}
}
