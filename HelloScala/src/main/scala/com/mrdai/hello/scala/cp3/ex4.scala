package com.mrdai.hello.scala.cp3

object ex4 {

  /** Given an array, produces a new array, starts with all positive elements in the given array in its original order,
    * followed by the rest non-positive elements.
    *
    * @param arr the given array
    * @return a new array, whose elements are partitioned by values
    */
  def apply(arr : Array[Int]) : Array[Int] = {
    val arrs = arr.partition(_ > 0)

    arrs._1 ++ arrs._2
  }

}
