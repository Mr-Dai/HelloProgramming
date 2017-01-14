package com.mrdai.hello.scala.cp4

import scala.collection.JavaConversions.propertiesAsScalaMap
import scala.collection.mutable

object ex7 {

  val props : mutable.Map[String, String] = System.getProperties()

  def apply() : Unit = {
    val maxLength = props.keys.foldLeft(0)((oldLen : Int, newKey : String) => Integer.max(oldLen, newKey.length))

    for ((key, value) <- props) {
      Console.print(key)
      Console.print(" " * (maxLength - key.length))
      Console.print(" | ")
      Console.println(value)
    }
  }
}
