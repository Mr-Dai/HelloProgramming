package com.mrdai.hello.scala.cp4

import java.io.File
import java.util.Scanner
import java.util.function.Consumer

import scala.collection.mutable

object ex2 {

  /**
    * Converts a Scala `Function` to Java `Consumer`
    */
  implicit def anyFunc2Consumer[A](func : (A => Any)) : Consumer[A] = {
    new Consumer[A] {
      override def accept(t: A): Unit = func(t)
    }
  }

  def apply(file : File) : mutable.Map[String, Int] = {
    val in = new Scanner(file)

    val map = new mutable.HashMap[String, Int]

    in.forEachRemaining((word : String) => {
      if (map.contains(word))
        map(word) = map(word) + 1
      else
        map += word -> 1
    })

    map
  }
}
