package com.mrdai.hello.scala.cp5

class BankAccount {
  private var privateBalance : Double = 0.0

  def deposit(value : Double): Unit = {
    privateBalance += value
  }

  def withdraw(value : Double): Unit = {
    if (privateBalance > value)
      privateBalance -= value
  }

  def balance = privateBalance

}
