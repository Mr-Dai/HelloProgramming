package com.mrdai.hello.scala.cp5

class Time private() {
  private var mins : Int = 0

  def this(hrs : Int, min : Int) {
    this()

    if (hrs < 0 || hrs > 23)
      throw new IllegalArgumentException("`hours` must be integer within [0,23]")
    if (min < 0 || min > 59)
      throw new IllegalArgumentException("`minutes` must be integer within [0,59]")

    mins = 60 * hrs + min
  }

  def hours = mins / 60
  def minutes = mins % 60

  def before(other: Time) : Boolean = {
    mins < other.mins
  }
}

