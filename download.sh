
. .env

mkdir tmp

curl -H 'Authorization: '$API_KEY  $FUSIONAUTH_URL/api/theme/$THEME_ID|jq '.theme.templates' > out.json

node splitfiles.js
