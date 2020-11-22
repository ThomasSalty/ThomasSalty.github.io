#!/bin/bash

# Usage from clean master branch to deploy build folder to gh-pages branch on remote:
# $ ./deploy.sh "Commit message"

if [[ $# -eq 1 ]]
then cp -a build/ ../ && git checkout gh-pages && cp -r ../build/* ./ && rm -rf ../build/ && git add . && git commit -m "$1" && git push && git checkout master
else echo "Add meg a commit message-t!"
fi
