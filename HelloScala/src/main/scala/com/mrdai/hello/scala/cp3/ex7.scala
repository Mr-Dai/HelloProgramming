package com.mrdai.hello.scala.cp3

object ex7 {

  /** Given an [[Array]], produces a new [[Array]] with all duplicate elements removed.
    *
    * @param arr the given [[Array]]
    * @tparam T type of the elements in the given [[Array]]
    * @return a new [[Array]] with all duplicate elements removed
    */
  def apply[T](arr : Array[T]) : Array[T] = {
    arr.distinct
  }

}
