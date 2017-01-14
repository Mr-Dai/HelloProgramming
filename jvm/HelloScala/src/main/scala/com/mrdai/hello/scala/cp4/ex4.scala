package com.mrdai.hello.scala.cp4

import java.io.File
import java.util.Scanner

import scala.collection.immutable

object ex4 {

  def apply(file : File) : Map[String, Int] = {
    val in = new Scanner(file)

    var map = immutable.SortedMap[String, Int]()

    in.forEachRemaining((word : String) => {
      map = map + (word -> map.getOrElse(word, 0))
    })

    map
  }
}
