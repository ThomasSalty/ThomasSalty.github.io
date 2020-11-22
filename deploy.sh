#!/bin/bash

# Run master.sh and then gh-pages.sh from master branch after making a change
# to html, css or js.
# Usage:
# $ ./deploy.sh "Commit message".

if [[ $# -eq 1 ]]
then bash ./master.sh "$1" && bash ./gh-pages.sh "$1"
else echo "Add meg a commit message-t!"
fi
