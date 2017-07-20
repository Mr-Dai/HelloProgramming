# 1.2 节习题

> **习题 1.1**：修改 `echo` 程序以打印 `os.Args[0]`，即运行时所执行命令的名称
>
> **习题 1.2**：修改 `echo` 程序，输出其参数的索引值和参数值，每行一个

这两题并无太大难度：

```go
func main() {
	for i, arg := range os.Args {
		fmt.Println(i, arg)
	}
}
```

[<- 返回上一节](echo3.md) [进入下一节 ->](join/README.md)
