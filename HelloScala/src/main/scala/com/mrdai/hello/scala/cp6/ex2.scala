package com.mrdai.hello.scala.cp6

abstract class UnitConversion {
  def convert(src: Double): Double
}

class InchesToCentimeters extends UnitConversion {
  override def convert(inches: Double): Double = inches * 2.54
}

class GallonsToLiters extends UnitConversion {
  override def convert(gallons: Double): Double = gallons * 3.78541178
}

class MilesToKilometers extends UnitConversion {
  override def convert(miles: Double): Double = miles / 0.62137
}
