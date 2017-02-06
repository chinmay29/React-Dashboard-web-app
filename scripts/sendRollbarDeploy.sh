#!/bin/bash

REVISION=`git log -n 1 --pretty=format:"%H"`
LOCAL_USERNAME="ap-zion"

curl https://api.rollbar.com/api/1/deploy/ \
  -F access_token=$ROLLBAR_SERVER \
  -F environment=$ENVIRONMENT \
  -F revision=$REVISION \
  -F local_username=$LOCAL_USERNAME