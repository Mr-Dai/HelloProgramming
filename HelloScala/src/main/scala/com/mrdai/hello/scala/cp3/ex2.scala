package com.mrdai.hello.scala.cp3

object ex2 {

  /** Swaps the adjacent pairs of elements in the given array
    *
    * @param arr the array to be swapped
    * @return the given array after being swapped
    */
  def apply[T](arr : Array[T]): Array[T] = {
    for (i <- 0 until arr.length / 2) {
      val tmp = arr(2 * i)
      arr(2 * i) = arr(2 * i + 1)
      arr(2 * i + 1) = tmp
    }

    arr
  }

}
