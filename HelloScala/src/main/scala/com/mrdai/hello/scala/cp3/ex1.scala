package com.mrdai.hello.scala.cp3

object ex1 {
  def apply(n : Int) : Array[Int] = {

    // If I use only `0 until n` here, the `yield` will return an `IndexedSeq` (which is actually a `Vector`)
    // By giving the `for` loop an array, the `yield` will generate another array
    //
    // The structure generated by `yield` will always have the same type as the structure it is looping on.
    for (i <- (0 until n).toArray)
      yield (Math.random() * n).toInt
  }

  /** Returns an n-length array of random integers, with each element within [0, n).
    *
    * `yield` now generates an IndexedSeq instead of Array,
    * a conversion from IndexedSeq to Array is needed.
    *
    * @param n the length and max element value of the array
    * @return an n-length array of random integers, with each element within [0, n)
    */
  def a(n : Int) : Array[Int] = {
    apply(n)
  }
}
