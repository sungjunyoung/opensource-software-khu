#!/bin/bash

args=$@

for arg in $args
do
    if [ ! -e $arg ]
    then
        echo "$arg is not exist"
    else
        mv $arg ./1001_trash/
    fi

done
