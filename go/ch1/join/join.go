package main

import (
	"fmt"
	"math/rand"
	"os"
	"strings"
	"text/tabwriter"
	"time"
)

func simpleJoin(args []string, sep string) (result string) {
	s := ""
	for _, arg := range args {
		result += s + arg
		s = sep
	}
	return
}

func quickJoin(args []string, sep string) string {
	return strings.Join(args, sep)
}

func prepareInput(n int) (result []string) {
	result = make([]string, n)
	rand.Seed(time.Now().Unix())
	for i := 0; i < n; i++ {
		var str string
		for j := 0; j < n; j++ {
			str += string(rand.Int31())
		}
		result[i] = str
	}
	return
}

var tableWriter = tabwriter.NewWriter(os.Stdout, 0, 4, 2, ' ', tabwriter.AlignRight)

func timeTest(start, end, step int) {
	fmt.Fprintf(tableWriter, "n\tQuick (ms)\tSimple (ms)\t\n")
	for start <= end {
		// Initialize test input
		args := prepareInput(start)
		// Time evaluate
		timeStart := time.Now()
		simpleResult := simpleJoin(args, " ")
		simpleDuration := time.Since(timeStart) / time.Millisecond
		timeStart = time.Now()
		quickResult := quickJoin(args, " ")
		if simpleResult != quickResult {
			fmt.Printf("Simple: %s\nQuick: %s\nMismatched!\n", simpleResult, quickResult)
			os.Exit(1)
		}
		quickDuration := time.Since(timeStart) / time.Millisecond
		fmt.Fprintf(tableWriter, "%d\t%d\t%d\t\n", start, quickDuration, simpleDuration)
		start += step
	}
	tableWriter.Flush()
}

func main() {
	timeTest(100, 1000, 100)
}
