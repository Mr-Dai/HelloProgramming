package com.mrdai.hello.scala.cp4

import java.io.File
import java.util.Scanner
import java.util.TreeMap

import scala.collection.mutable
import scala.collection.JavaConversions.mapAsScalaMap

import com.mrdai.scala.learning.cp4.ex2.ex2.anyFunc2Consumer

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
