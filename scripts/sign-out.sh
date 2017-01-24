#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-out"
TOKEN="DIFZUSA7KxKprbLd/1DdPAZ3vXXHdh0V0ZSP7NiapHQ=--9ytAbKwSylQPybDots6I8syZTZyo2Ubl090aQnsFu9M="

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
