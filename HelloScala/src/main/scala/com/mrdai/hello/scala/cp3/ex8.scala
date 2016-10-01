package com.mrdai.hello.scala.cp3

import com.mrdai.scala.learning.cp3.ex6.ex6

import scala.collection.mutable.ArrayBuffer

object ex8 {

  /** Given an [[Array]], collects the indices of all negative elements,
    * reverse them, and invoke `arr.remove` with each of them
    *
    * @param arr the given array
    * @return the given array after removing all negative elements
    */
  def apply(arr : Array[Int]) : Array[Int] = {
    val arrB = arr.toBuffer
    val indices = new ArrayBuffer[Int]()

    for (i <- arr.indices if arr(i) < 0)
      indices += i

    // Reverse the indices
    ex6(indices)

    indices.map(arrB.remove)

    arrB.toArray
  }

}
