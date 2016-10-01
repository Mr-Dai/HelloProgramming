package com.mrdai.hello.scala.cp6

object CardSuit extends Enumeration {
  type Suit = Value

  val Hearts = Value("\u2665")
  val Diamonds = Value("\u2666")
  val Clubs = Value("\u2663")
  val Spades = Value("\u2660")
}
