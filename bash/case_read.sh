#!/bin/bash

echo -n "Type a digit or a letter > "
read character
case $character in
    [[:lower:]] | [[:upper:]] ) echo "You typed the letter $character";;
    [0-9] )                     echo "You typed the digit $character";;
    * )                         echo "You did not type a letter or a digit"
esac
