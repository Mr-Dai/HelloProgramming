package com.mrdai.hello.scala.cp3

object ex5 {

  /**
   * Returns the average of the given array
   *
   * @param arr the given array
   * @return the average
   */
  def apply(arr : Array[Double]) : Double = {
    arr.sum / arr.length
  }

}
