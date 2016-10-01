package com.mrdai.hello.scala.cp5

class Time(val hours : Int, val minutes : Int) {
  if (hours < 0 || hours > 23)
    throw new IllegalArgumentException("`hours` must be integer within [0,23]")
  if (minutes < 0 || minutes > 59)
    throw new IllegalArgumentException("`minutes` must be integer within [0,59]")

  def before(other: Time) : Boolean = {
    hours < other.hours || hours == other.hours && minutes < other.minutes
  }

}
