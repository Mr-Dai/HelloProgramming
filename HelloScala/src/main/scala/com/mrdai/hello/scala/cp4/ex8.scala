package com.mrdai.hello.scala.cp4

object ex8 {

  def minmax(values : Array[Int]) : (Int, Int) = {
    values.foldLeft((Int.MaxValue, Int.MinValue))((pair : (Int, Int), newVal : Int) => {
      val newMax = Math.max(pair._1, newVal)
      val newMin = Math.min(pair._2, newVal)

      (newMin, newMax)
    })
  }

}
