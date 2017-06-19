#!/bin/bash

directoryPath=$1
files=`find $directoryPath -type f -exec basename {} \; `

result=()
for pointFile in $files
do
    count=0
    for compareFile in $files
    do
        count=$(($count+1))
        if [ $count -eq 1 ]
        then
            continue
        fi

        if [ $pointFile = $compareFile ]
        then
            result+=($pointFile)
            continue
        fi
    done
done

for dupFile in $result
do
    echo $dupFile
done