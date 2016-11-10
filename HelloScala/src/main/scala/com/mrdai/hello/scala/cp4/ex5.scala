package com.mrdai.hello.scala.cp4

import java.io.File
import java.util.{Scanner, TreeMap}

import scala.collection.JavaConversions.mapAsScalaMap
import scala.collection.mutable

object ex5 {

  def apply(file : File) : mutable.Map[String, Int] = {
    val in = new Scanner(file)

    val map : mutable.Map[String, Int] = new TreeMap[String, Int]

    in.forEachRemaining((word : String) => {
      if (map.contains(word))
        map(word) = map(word) + 1
      else
        map += word -> 1
    })

    map
  }
}
