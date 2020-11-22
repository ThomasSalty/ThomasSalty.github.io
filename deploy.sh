#!/bin/bash

if [[ $# -eq 1 ]]
then cp -a build/ ../ && git checkout gh-pages && cp -r ../build/* ./ && rm -rf ../build/ && git add . && git commit -m \"$1\"
else echo "Add meg a commit message-t!"
fi
