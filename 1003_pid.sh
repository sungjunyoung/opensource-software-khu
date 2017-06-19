#!/bin/bash

processName=$1

processInfo=`ps -c | grep "$processName"`


count=0
result=()
for processID in $processInfo
do
    count=$(($count+1))
    if [ $(($count%4)) -eq 1 ]
    then
        result+=($processID)
    fi
done


for PID in $result
do
    echo $PID
done