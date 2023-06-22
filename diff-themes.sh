#!/bin/bash

current_theme=$1
new_theme=$2

for file_path in $(find $current_theme -type f)
do
  original_file=$file_path
  modified_file=$new_theme/${file_path#*/}
  diff --ignore-all-space <(sed -e '$a\' $original_file) <(sed -e '$a\' $modified_file) \
    && : || echo ${file_path#*/} 'has differences'
done