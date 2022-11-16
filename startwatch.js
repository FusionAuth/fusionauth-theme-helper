const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv').config();

const apiKey = process.env.API_KEY;
const themeId = process.env.THEME_ID;
const fusionauthUrl = process.env.FUSIONAUTH_URL;
const tmpFolder = './'+process.env.TMP_DIR+'/';

const {FusionAuthClient, ClientResponse} = require('@fusionauth/typescript-client');

const client = new FusionAuthClient(apiKey, fusionauthUrl);

fs.watch(tmpFolder, (event, filename) => {
  if (filename) {
    const obj = {}
    if ! filename.endsWith(".ftl") {
      // ignore non template files
      return;
    }

    fs.readdirSync(tmpFolder).forEach(file => {
      let name = file.replace(".ftl","");
      // console.log(name);
      let rawdata = fs.readFileSync(tmpFolder+file);
      obj[name] = String(rawdata)
    });
    
    const theme = {};
    theme['templates'] = obj;
    const wrapper = {};
    wrapper['theme'] = theme;

    // console.log(wrapper);

    const toUpload = wrapper; //JSON.stringify(wrapper);
    client.patchTheme(themeId,toUpload).then(clientResponse => {
        console.log("uploaded...");
    }).catch(console.error);
  }
});

