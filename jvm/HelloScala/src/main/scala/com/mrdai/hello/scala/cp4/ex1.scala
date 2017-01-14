package com.mrdai.hello.scala.cp4

object ex1 {

  /** Given a [[Map]] from product name to its price, return a
    * new [[Map]] of all given products with 90%-discounted prices
    *
    * @param products the given products
    * @return a new [[Map]] of all given products with 90%-discounted prices
    */
  def apply(products : Map[String, Double]) : Map[String, Double] = {
    for ((product, price) <- products)
      yield (product, price * 0.9)
  }
}
