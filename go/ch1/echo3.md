# 命令行参数 - 3

我们可以继续对 `echo2` 做出改进，代码如下：

```go
func main() {
	fmt.Println(strings.Join(os.Args[1:], " "))
}
```

我们使用 `strings.Join` 函数替代了原本的 `for` 循环字符串拼接。由此我们便认识到了一个新的包，
`strings`，其提供了大量方便我们对字符串进行操作的函数。
（点击[此处](https://golang.org/pkg/strings/)查看 `strings` 包的文档）

[<- 返回上一节](echo2.md) [进入下一节 ->](echo4.md)
