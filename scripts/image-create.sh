#!/bin/bash

API="http://localhost:4741"
URL_PATH="/images"
TOKEN="jmGdIR3ndIqUPDLojGCNec1sNTqDMIbrUjepLVRX7sE=--EV4gevTczN2m6Ks/DKFEHkrN2PWkzdvXOiuvFXYBgNE="

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "image": {
      "title": "deck1",
      "category": "decks",
      "description": "a deck",
      "link": "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-0/p200x200/14731267_348762942125150_5918509033525094001_n.ng?oh=14c7e08c17ba15e724bef036a93cda84&oe=591B8878"
    }
  }'

echo
