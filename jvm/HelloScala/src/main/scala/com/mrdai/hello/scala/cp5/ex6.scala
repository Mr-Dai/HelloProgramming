package com.mrdai.hello.scala.cp5

class Person(orgAge : Int) {
  private var privateAge = if (orgAge < 0) 0 else orgAge
  
  def age = privateAge
  def age_=(newValue : Int): Unit = {
    if (newValue > privateAge)
      privateAge = newValue
  }
}
