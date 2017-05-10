#!/bin/bash
# refactor - Bash script that was used to refactored the structure of this directory

until [ "$#" -lt 1 ]; do
    dirname=$1
    for entry in $(ls $dirname); do
        entry=$dirname/$entry
        if [ -d "$entry" ]; then
            # echo "$entry/main.go -> ${entry}.go"
            # echo "$entry/README.md -> ${entry}.md"
            if [ -f $entry/main.go ]; then mv -v $entry/main.go ${entry}.go; fi
            if [ -f $entry/README.md ]; then mv -v $entry/README.md ${entry}.md; fi
            rm -r $entry
        fi
    done
    shift
done
