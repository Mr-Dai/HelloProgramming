package com.mrdai.hello.scala.cp6

class Reverse extends App {
  args.foldRight(null)((arg: String, ignore: Any) => {
    print(arg)
    null
  })
}
