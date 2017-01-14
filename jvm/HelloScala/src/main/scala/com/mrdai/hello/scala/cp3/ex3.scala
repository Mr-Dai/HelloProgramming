package com.mrdai.hello.scala.cp3

import scala.reflect.ClassTag

object ex3 {

  /** Given an array, produces a new array, whose elements are produced by changing the position of
    * each adjacent pairs of elements in the given array.
    *
    * @param arr the given array
    * @tparam T the type of elements in the given array
    * @return a new array
    */
  def apply[T](arr : Array[T])(implicit m: ClassTag[T]): Array[T] = {
    val newArr = new Array[T](arr.length)

    for (i <- 0 until arr.length / 2) {
      newArr(2 * i) = arr(2 * i + 1)
      newArr(2 * i + 1) = arr(2 * i)
    }

    if ((arr.length / 2) * 2 < arr.length)
      newArr(arr.length - 1) = arr.last

    newArr
  }

}
