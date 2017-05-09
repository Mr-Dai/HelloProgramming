#!/bin/sh
# sysinfo_page - A script to produce HTML file

# Constants
TITLE="System Information for $NAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"

# Functions
system_info() {
    if ls /etc/*release 1>/dev/null 2>&1; then
        echo "<h2>System release info</h2>"
        echo "<pre>"
        for i in /etc/*release; do
            # Since we can't be sure of the
            # length of the file, only
            # display the first line.
            head -n 1 $i
        done
        uname -orp
        echo "</pre>"
    fi
}

show_uptime() {
    echo "<h2>System uptime</h2>"
    echo "<pre>"
    uptime
    echo "</pre>"
}

drive_space() {
    echo "<h2>Filesystem space</h2>"
    echo "<pre>"
    df
    echo "</pre>"
}

home_space() {
    echo "<h2>Home directory space by user</h2>"
    echo "<pre>"
    FORMAT="%8s%10s%10s   %-s\n"
    printf "$FORMAT" "Dirs" "Files" "Blocks" "Directory"
    printf "$FORMAT" "----" "-----" "------" "---------"
    if [ $(id -u) = "0" ]; then
        dir_list="/home/*"
    else
        dir_list=$HOME
    fi
    for home_dir in $dir_list; do
        total_dirs=$(find $home_dir -type d | wc -l)
        total_files=$(find $home_dir -type f | wc -l)
        total_blocks=$(du -s $home_dir)
        printf "$FORMAT" $total_dirs $total_files $total_blocks
    done
    echo "</pre>"
}

write_page() {
    cat <<- _EOF_
    <html>
    <head>
        <title>$TITLE</title>
    </head>

    <body>
        <h1>$TITLE</h1>
        <p>$TIME_STAMP</p>
        $(system_info)
        $(show_uptime)
        $(home_space)
        $(drive_space)
    </body>
    </html>
_EOF_
}

usage() {
    echo "usage: sysinfo_page [[[-f file ] [-i]] | [-h]]"
}

# Main
interactive=
filename=sysinfo_page.html
while [ "$1" != "" ]; do
    case $1 in
        -f | --file )           shift
                                filename = $1
                                ;;
        -i | --interactive )    interactive=1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

# Test code to verify command line processing
if [ "$interactive" = "1" ]; then
    echo "interactive in on"
    response=
    echo -n "Enter name of output file [$filename] > "
    read response
    if [ -n "$response" ]; then
        filename=$response
    fi
    if [ -f $filename ]; then
        echo -n "Output file exists. Overwrite? (y/n) > "
        read response
        if [ "$response" != "y" ]; then
            echo "Exiting program."
            exit 1
        fi
    fi
else
    echo "interactive is off"
fi
echo "output file = $filename"

write_page > $filename
