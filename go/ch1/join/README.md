# 1.2 节习题（续）

> **习题 1.3**：尝试对比 `echo` 程序使用 `+` 运算符拼接字符串的版本和使用 `strings.Join` 函数的版本的运行时间差异。1.6 节介绍了 `time` 包的基本使用，11.4 节介绍了如何通过编写基准测试来系统地评估程序性能。

首先为了方便测试，我们考虑该问题的本质在于对比字符串 `+` 运算符拼接与 `strings.Join` 函数的性能差于。可编写函数如下进行测试：

```go
func simpleJoin(args []string, sep string) (result string) {
	s := ""
	for _, arg := range args {
		result += s + arg
		s = sep
	}
	return
}

func quickJoin(args []string, sep string) {
	return strings.Join(args, sep)
}
```

接下来我们只需要测试 `simpleJoin` 函数和 `quickJoin` 函数的性能差异。

我们先来尝试用 `time` 包进行实现（在[这里](https://godoc.org/time)可以查看 `time` 包的文档）。编写测试函数如下：

```go
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
```

可得到形如下的结果：

```
     n  Quick (ms)  Simple (ms)
   100           0            0
   200           0            2
   300           0            6
   400           1           38
   500           1           44
   600           1           70
   700           1          100
   800           0          119
   900           1          169
  1000           1          240
```

接下来我们使用 Golang 基准测试进行实现（在[这里](https://golang.org/pkg/testing/#hdr-Benchmarks) 可以查看 Golang 基准测试的写法）。我们创建 `join_test.go` 测试文件，并在其中编写测试案例如下：

```go
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
```

通过以下命令运行基准测试：

```bash
$  go test -bench=Join -benchmem
```

可得到形如下的结果：

```
BenchmarkJoinSimple-4                200           6472204 ns/op        41819648 B/op        299 allocs/op
BenchmarkJoinQuick-4               20000            114206 ns/op          557056 B/op          2 allocs/op
PASS
ok      go/ch1/join    5.181s
```

可见，无论是耗时还是内存占用上，使用 `strings.Join` 函数实现字符串拼接有着极大的优势。

[<- 返回上一节](../echo4.md) [进入下一节 ->](../dup1.md)
