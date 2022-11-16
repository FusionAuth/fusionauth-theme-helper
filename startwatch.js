const fs = require('fs');
const tmpFolder = './tmp/';
const https = require('https');

const {FusionAuthClient, ClientResponse} = require('@fusionauth/typescript-client');

const client = new FusionAuthClient('90d8fb62-6f13-47d4-8ef6-1c3e687883c6', 'https://sandbox.fusionauth.io');

fs.watch(tmpFolder, (event, filename) => {
  if (filename) {
    const obj = {}

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
    client.patchTheme('d0dbb2c1-fbef-421d-8403-514571e6c67b',toUpload).then(clientResponse => {
        console.log("uploaded...");
    }).catch(console.error);
/*
    const options = {
      hostname: 'local.fusionauth.io',
      port: 443,
      path: '/api/theme/d0dbb2c1-fbef-421d-8403-514571e6c67b',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': toUpload.length,
        'Authorization': 'bf69486b-4733-4470-a592-f1bfce7af580',
      },
   };

    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      res.on('data', d => {
        process.stdout.write(d);
      });
    });
    req.on('error', error => {
      console.error(error);
    });

    req.write(toUpload);
    req.end();
*/
  }
});


//#node buildjson.js > updated.json

//#curl -XPATCH -H 'Content-type: application/json' -H 'Authorization: bf69486b-4733-4470-a592-f1bfce7af580' https://local.fusionauth.io/api/theme/d0dbb2c1-fbef-421d-8403-514571e6c67b -d @updated.json

   //#curl -XPATCH -H 'Content-type: application/json' -H 'Authorization: bf69486b-4733-4470-a592-f1bfce7af580' https://local.fusionauth.io/api/theme/d0dbb2c1-fbef-421d-8403-514571e6c67b -d @updated.json
