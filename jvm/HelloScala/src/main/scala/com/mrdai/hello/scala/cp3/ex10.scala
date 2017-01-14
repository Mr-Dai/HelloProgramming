package com.mrdai.hello.scala.cp3

import java.awt.datatransfer._

import scala.collection.JavaConversions.asScalaBuffer
import scala.collection.mutable
import scala.collection.mutable.Buffer

object ex10 {

  /** Invokes `SystemFlavorMap.getNativesForFlavor` with `DataFlavor.imageFlavor` and saves
    * the result in an [[Buffer]]
    *
    * @return the [[Buffer]]
    */
  def apply() : mutable.Buffer[String] = {
    val flavors = SystemFlavorMap.getDefaultFlavorMap.asInstanceOf[SystemFlavorMap]

    flavors.getNativesForFlavor(DataFlavor.imageFlavor)
  }

}
