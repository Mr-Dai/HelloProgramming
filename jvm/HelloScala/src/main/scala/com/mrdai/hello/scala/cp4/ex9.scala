package com.mrdai.hello.scala.cp4

object ex9 {

  def lteqgt(values: Array[Int], v: Int): (Int, Int, Int) = {
    values.foldLeft((0, 0, 0))((tuple: (Int, Int, Int), newVal: Int) => {
      val _1 = {
        if (newVal < v)
          tuple._1 + 1
        else
          tuple._1
      }
      val _2 = {
        if (newVal == v)
          tuple._2 + 1
        else
          tuple._2
      }
      val _3 = {
        if (newVal > v)
          tuple._3 + 1
        else
          tuple._3
      }

      (_1, _2, _3)
    })
  }
}
