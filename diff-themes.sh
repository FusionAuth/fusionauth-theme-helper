#!/bin/bash

for f in $( find $1 -type f  )
do
  f1=$f
  f2=$2/${f#*/}
  # echo "compare: $f1 $f2"
  diff --ignore-all-space <(sed -e '$a\' $f1) <(sed -e '$a\' $f2) \
    && : || echo $f1 '** are different'
done