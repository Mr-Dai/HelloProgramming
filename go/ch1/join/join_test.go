package main

import "testing"

func BenchmarkJoinSimple(b *testing.B) {
	args := prepareInput(300)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		simpleJoin(args, " ")
	}
}

func BenchmarkJoinQuick(b *testing.B) {
	args := prepareInput(300)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		quickJoin(args, " ")
	}
}
