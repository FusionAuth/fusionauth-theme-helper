
. .env

mkdir $TMP_DIR

curl -H 'Authorization: '$API_KEY  $FUSIONAUTH_URL/api/theme/$THEME_ID|jq '.theme.templates' > $TMP_DIR/out.json

node splitfiles.js
