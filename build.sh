#!/bin/bash

# Use this file from master branch to minify static files (html, css, js),
# then add, commit and push them to remote master branch.

# Usage:
# $ ./build.sh "Commit message"

if [[ $# -eq 1 ]]
then grunt && git add . && git commit -m "$1" && git push
else echo "Add meg a commit message-t!"
fi
