# 文本查重 - 1

我们这次通过一个文本查重程序来学习如何处理标准输入。代码如下：

```go
func main() {
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)
	for input.Scan() {
		counts[input.Text()]++
	}
	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}
```

首先，我们使用 `make` 函数创建了一个 `map[string]int` 变量，这代表一个键为 `string` 且值为 `int` 的 `map`。
`map` 能够在单位时间内完成键值对的存储和查找，且维护着所存储的键的唯一集合（使用键的 `==` 运算进行判等）。

接着，我们使用了 `bufio` 包的 `NewScanner` 函数，以 `os.Stdin` 为数据来源创建了一个 `Scanner` 对象。
实际上，`NewScanner` 函数接受任何实现了 `os.Reader` 接口的参数，后面我们还会使用它来从别的地方读入数据。
（点击[此处](https://golang.org/pkg/bufio/)查看 `bufio` 包的文档）

`Scanner` 对象的 `Scan` 方法能令 `Scanner` 从数据来源中读入一行文本并将末尾的换行符去掉。
当成功读入数据时，`Scan` 方法将返回 `true`；若已经到达数据末尾，则 `Scan` 方法将返回 `false`。
在读入后，我们即可调用 `Text` 方法获取到所读入的数据。

在读取的同时，我们使用 `counts[input.Text()]++` 语句来更新 `counts` 映射中的值。该语句等价于以下语句：

```go
line := input.Text()
counts[line] = counts[line] + 1
```

我们使用中括号表达式来访问 `map` 中与指定键关联的值。若遇到不存在的键，`map` 会自动返回值类型的默认零值：
在我们的程序中，值类型是 `int`，默认零值即 `0`。

在下一个循环中，`range` 运算再次被用来迭代 `counts`，这次它返回的是 `counts` 中的所有键值对。
值得注意的是，当迭代 `map` 时，键值对返回的顺序是不确定的。

在循环中，我们使用了 `fmt` 包的 `Printf` 函数。它和其他编程语言中的 `printf` 函数类似，
接受一个用于指定输出格式的字符串，并以该格式输出后续指定的内容。格式字符串的编写与其他编程语言的类似，
部分常用的动词（Verb）包括如下：

| 动词 | 含义 |
| --- | --- |
| `%d` | 整型数值（**D**ecimal） |
| `%x`、`%o`、`%b` | 十六进制数值（He**X**adecimal）、八进制数值（**O**ctal）和二进制数值（**B**inary） |
| `%f`、`%g`、`%e` | 浮点数（**F**loating-Point Number）：`3.141593`、`3.141592653589793`、`3.141593e+00` |
| `%t` | 布尔值（**T**ruth）：`true` 或 `false` |
| `%c` | Unicode 字符（**C**ode Point）。在 Go 语言中又称为符号（Rune） |
| `%q` | 带双引号的字符串（**Q**uoted String，`"abc"`）或带单引号的符号（`'c'`） |
| `%v` | 以自然格式输出任意指定值（**V**alue） |
| `%t` | 指定值的类型（**T**ype） |
| `%%` | 输出 `%` 符号 |

除此之外，`Printf` 也支持常见的转义序列（Escape Sequence），如 `\n`、`\t` 等。

[<- 返回上一节](join/README.md) [进入下一节 ->](dup2.md) 
