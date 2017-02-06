#!/bin/bash

#set git sha in package.json
node ./scripts/setGitSha

#set git branch in package.json
node ./scripts/setGitBranch

export APP_VERSION=`git rev-parse --short HEAD`
export APP_NAME="qa-builds"

cd dist
tar -czvf "${BRANCH}-${APP_VERSION}.tar.gz" . --exclude "./${BRANCH}-${APP_VERSION}.tar.gz"

aws s3 cp ${BRANCH}-${APP_VERSION}.tar.gz s3://${S3_BUCKET}/${APP_NAME}/${BRANCH}-${APP_VERSION}.tar.gz

curl -X POST -H "Content-Type:application/json" -d "{\"project\":\"${APP_NAME}\",\"branch\":\"${BRANCH}\",\"version\":\"${APP_VERSION}\"}" https://zion.app-press.com/deploy/start
