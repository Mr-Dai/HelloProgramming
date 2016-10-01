package com.mrdai.hello.scala.cp3

import java.util.TimeZone

object ex9 {

  /** Returns the sequence of time zone ids in America, with prefix `America/` removed and sorted */
  def apply() : Seq[String] = {
    TimeZone.getAvailableIDs.filter(_ startsWith "America/").map(_.substring(8)).sorted
  }

}
