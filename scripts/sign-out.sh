#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-out"
ID="58878e653b824494422775e6"
TOKEN="Xchf7LLNHlTFWiWK28WOW+jDr+84GeXf/YVBY0wZiiA=--bmcXj5ZgdWFetEC3ImcfvDdfLdSWSNu+3h+HnexS+9o="

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
