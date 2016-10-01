package com.mrdai.hello.scala.cp6

import com.mrdai.scala.learning.cp6.ex6.CardSuit._

case class Card(suit: Suit, number: Int)

object ex7 {
  def isHeartOrDiamond(card: Card): Boolean = card.suit == Hearts || card.suit == Diamonds
}
