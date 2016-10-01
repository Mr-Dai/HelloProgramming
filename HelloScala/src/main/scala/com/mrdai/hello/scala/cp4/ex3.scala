package com.mrdai.hello.scala.cp4

import java.io.File
import java.util.Scanner

import scala.collection.immutable

import com.mrdai.scala.learning.cp4.ex2.ex2.anyFunc2Consumer

object ex3 {

  def apply(file : File) : Map[String, Int] = {
    val in = new Scanner(file)

    var map = new immutable.HashMap[String, Int]

    in.forEachRemaining((word : String) => {
      map = map + (word -> (map.getOrElse(word, 0) + 1))
    })

    map
  }
}
