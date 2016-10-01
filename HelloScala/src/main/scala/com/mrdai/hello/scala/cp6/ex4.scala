package com.mrdai.hello.scala.cp6

class Point private (x: Int, y: Int)

object Point {
  def apply(x: Int, y: Int) = new Point(x, y)
}

object Points {
  val Origin = Point(0, 0)
}
