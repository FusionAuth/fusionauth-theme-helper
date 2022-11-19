
. .env

mkdir -p $TMP_DIR

curl -H 'Authorization: '$API_KEY  $FUSIONAUTH_URL/api/theme/$THEME_ID|jq '.theme.templates' > $TMP_DIR/out.json
curl -H 'Authorization: '$API_KEY  $FUSIONAUTH_URL/api/theme/$THEME_ID|jq '.theme.defaultMessages'  |sed 's/^"//' |sed 's/"$//' |node convert-newlines.js > $TMP_DIR/defaultMessages.txt
#curl -H 'Authorization: '$API_KEY  $FUSIONAUTH_URL/api/theme/$THEME_ID|jq '.theme.localizedMessages' > $TMP_DIR/localizedMessages.properties

node splitfiles.js

rm $TMP_DIR/out.json
