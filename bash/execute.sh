#!/bin/bash

usage() {
    # TODO Echo usage message
    return
}

while [ "$#" -gt 0 ]; do
    case $1 in
        -h | --help )   usage; exit;;
        -f | --file )   if [ "$#" -ge 2 ]; then
                            echo "Filename must be provided after $1 option" 1>&2
                            exit 1
                        else
                            shift
                            filename=$1
                        fi;;
        * )             command=$1;;
    esac
    shift
done

if [ -z "$filename" ]; then
    $command
elif [ -w "$filename" ] || [ ! -e "$filename" ]; then
    echo "$ $command" >> $filename
    $command >> $filename 2>&1
    if [ "$?" -ne 0 ]; then
        echo "Exit with status $?" >> $filename
    fi
    echo "" >> $filename
elif [ -e "$filename" ]; then
    echo "$filename exists but is not a writable file." 1>&2
    $command
    exit 1
fi
