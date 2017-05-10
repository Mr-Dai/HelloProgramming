# Hello World

在第一节，我们先通过经典的 Hello World 示例来学习一个 Go 程序的基本组成及运行方法。
代码如下：

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello 世界")
}
```

首先我们应认识到，Go 是一门编译型语言，其附带的工具能够将 Go 源代码转换为对应的机器语言指令。
在安装 Go 语言开发环境后，我们可以通过 `go` 命令的各种子命令来使用这些工具。其中，`run`
子命令可以将指定的若干个 `.go` 文件编译为可执行文件并运行。

输入如下命令即可运行该代码：

```bash
$ go run helloworld.go
Hello 世界
```

我们还可以通过 `go build` 命令来生成编译后的可执行文件：

```bash
$ go build helloworld.go
$ ./helloworld
Hello 世界
```

值得注意的是，Go 语言能很好地处理 Unicode 编码，因此代码中任意语言的字符都能被很好地处理。

Go 代码通常以包（Package）的形式进行组织，类似于其他语言的库（Library）或者模块（Module）。
一个包由处于同一目录下的若干个 `.go` 文件组成。所有 Go 源文件在开头处都会有一个 `package`
语句声明其所属的包。

Hello World 示例代码属于 `main` 包。这是一个特殊的包，用于定义一个可独立执行的程序，而不是一个代码库。
`main` 包中的 `main` 函数则会作为程序执行的入口。

除了 `main` 包以外，Go 的标准库中包含上百个包，用于辅助你完成各种日常任务。在示例代码中，
我们使用了 `fmt` 包，它主要用于格式化输出（**F**or**M**a**T**ted output）和扫描输入，而我们使用了它提供的
`Println` 函数。

Go 语言对源代码文件的格式有着很高的严格。首先，Go 源文件中使用的所有包需要通过 `import` 语句声明，
`import` 语句应紧随 `package` 声明之后。尝试使用任何未声明引入的包或是引入未被使用的包都会导致 Go
源文件无法通过编译。

为保证我们写的 Go 源文件格式正确，Go 提供了 [`gofmt`](https://golang.org/cmd/gofmt/) 工具来对你的
Go 源文件进行格式化。除此之外，我们还可以通过 [`goimports`](https://godoc.org/golang.org/x/tools/cmd/goimports)
工具来管理源文件中所使用的包，但该工具并不包含在默认的 Go 开发环境中，我们需要通过如下命令来安装它：

```bash
$ go get golang.org/x/tools/cmd/goimports
```

在 `import` 声明之后，Go 源文件可以通过 `func`、`var`、`const` 和 `type` 关键字来声明函数、
变量、常量和类型。Go 语言对这类声明的顺序没有明确要求。

从示例代码中我们可以看到，一个函数声明语句块实际上由 `func` 关键字、函数名称、参数列表（`main`
函数不接受任何参数）、返回值列表（`main` 函数没有返回值）和函数体组成。

除此之外，我们不需要在 Go 语句的结尾处添加分号，但加上也无妨，尽管多余的分号会被 `gofmt` 工具自动移除。
Go 编译器会在编译时自动在合适的行末加上分号。当你需要在一行内写多个语句时，你才需要使用分号来分隔这些语句。

[进入下一节 ->](echo1.md)
