# 文本查重 - 2

这次我们对之前的程序做出一些修改，允许用户通过命令行参数指定文件作为数据来源，以此学习文件读取操作。
代码如下：

```go
func main() {
	counts := make(map[string]int)
	files := os.Args[1:]
	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}
			countLines(f, counts)
			f.Close()
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
```

首先，还是创建 `counts` 映射。如果用户没有使用命令行参数指定读取文件，我们就照旧从标准输入读入数据，
否则我们就从指定的文件中读入数据。注意到，我们使用了 `os.Open` 函数来访问文件
（点击[此处](https://golang.org/pkg/os/#Open)查看 `os.Open` 的文档）。该函数返回一个 `*os.File`
和一个 `error` 作为结果，其中如果 `error` 结果值为 `nil` 时代表此次操作没有发生错误。
实际上，将 `error` 作为函数结果进行返回即为 Go 语言特有的错误抛出机制。

我们通过将计数用的代码放到 `countLines` 函数中来减少代码冗余，而 `countLines` 函数的实现则与之前类似：

```go
func countLines(f *os.File, counts map[string]int) {
	input := bufio.NewScanner(f)
	for input.Scan() {
		counts[input.Text()]++
	}
}
```

注意到，我们指定了代表数据来源的参数类型为 `*os.File`：`os.Open` 函数的结果值即为该类型，而 `os.Stdin`
同为该类型（点击[此处](https://golang.org/pkg/os/#File)查看 `os.File` 的文档）。

[<- 返回上一节](dup1.md) [进入下一节 ->](dup3.md) 
