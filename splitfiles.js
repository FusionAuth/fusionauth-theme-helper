'use strict';

const dotenv = require('dotenv').config();

const tmpFolder = './'+process.env.TMP_DIR+'/';

const fs = require('fs');

let rawdata = fs.readFileSync(tmpFolder+'out.json');
let themes = JSON.parse(rawdata);

for (const [key,val] of Object.entries(themes)) {
  fs.writeFileSync(tmpFolder+key+".ftl", val);
}

