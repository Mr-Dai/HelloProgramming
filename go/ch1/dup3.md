# 文本查重 - 3

我们之前的 `dup2` 实现以流处理的方式从指定文件或标准输入中进行逐行扫描并计数。
这种实现没有什么问题，但我们也可以选择将整个文件读入到内存中再将其按行分离。
代码如下：

```go
func main() {
	counts := make(map[string]int)
	for _, filename := range os.Args[1:] {
		data, err := ioutil.ReadFile(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
			continue
		}
		for _, line := range strings.Split(string(data), "\n") {
			counts[line]++
		}
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
```

这里我们使用了 `ioutil` 包的 `ReadFile` 函数读入文件的全部内容（点击[此处](https://golang.org/pkg/io/ioutil/)查看
`ioutil` 包的文档），然后使用了 `strings.Split` 函数来将这些内容按行分离。

实际上，诸如 `bufio.Scanner`、`ioutil.ReadFile` 这样的函数都是利用了 `*os.File` 的 `Read` 方法，
因此在合适的时候我们可以直接借助 `bufio` 和 `io/ioutil` 包中的便捷函数简洁地完成我们需要的功能。

[<- 返回上一节](dup2.md) [进入下一节 ->](lissajous.md) 
