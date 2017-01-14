package com.mrdai.hello.scala.cp3

import scala.collection.mutable.ArrayBuffer

object ex6 {

  /** Reverses the give [[Array]]
    *
    * @param arr the given [[Array]]
    * @tparam T type of elements in the given [[Array]]
    * @return the given [[Array]] after being reversed
    */
  def apply[T](arr : Array[T]) : Array[T] = {
    for (i <- arr.indices) {
      val tmp = arr(i)
      arr(i) = arr(arr.length - i - 1)
      arr(arr.length - i - 1) = tmp
    }

    arr
  }

  /** Reverses the given [[ArrayBuffer]]
    *
    * @param arr the given [[ArrayBuffer]]
    * @tparam T type of elements in the given [[ArrayBuffer]]
    * @return the given [[ArrayBuffer]] after being reversed
    */
  def apply[T](arr : ArrayBuffer[T]) : ArrayBuffer[T] = {
    for (i <- arr.indices) {
      val tmp = arr(i)
      arr(i) = arr(arr.length - i - 1)
      arr(arr.length - i - 1) = tmp
    }

    arr
  }

}
